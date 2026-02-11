import User from '../models/User.js';
import Vendor from '../models/Vendor.js';
import Order from '../models/Order.js';
import Transaction from '../models/Transaction.js';
import bcrypt from 'bcryptjs';

// User Management
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, address, pincode } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password, phone, address, pincode });
    res.status(201).json({ message: 'User created successfully', user: { ...user._doc, password: undefined } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, pincode, password } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.pincode = pincode || user.pincode;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json({ message: 'User updated successfully', user: { ...user._doc, password: undefined } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Vendor Management
export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().select('-password');
    res.json({ vendors });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createVendor = async (req, res) => {
  try {
    const { name, email, password, phone, businessName, address } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: 'Vendor already exists' });
    }

    const vendor = await Vendor.create({ name, email, password, phone, businessName, address });
    res.status(201).json({ message: 'Vendor created successfully', vendor: { ...vendor._doc, password: undefined } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, businessName, address, password } = req.body;

    const vendor = await Vendor.findById(id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    if (email && email !== vendor.email) {
      const existingVendor = await Vendor.findOne({ email });
      if (existingVendor) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    vendor.name = name || vendor.name;
    vendor.email = email || vendor.email;
    vendor.phone = phone || vendor.phone;
    vendor.businessName = businessName || vendor.businessName;
    vendor.address = address || vendor.address;

    if (password) {
      vendor.password = await bcrypt.hash(password, 10);
    }

    await vendor.save();
    res.json({ message: 'Vendor updated successfully', vendor: { ...vendor._doc, password: undefined } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findByIdAndDelete(id);

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Reports
export const getReports = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalVendors = await Vendor.countDocuments();
    const totalOrders = await Order.countDocuments();
    const revenue = await Transaction.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      totalUsers,
      totalVendors,
      totalOrders,
      totalRevenue: revenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('userId', 'name email')
      .populate('orderId')
      .sort({ createdAt: -1 });
    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
