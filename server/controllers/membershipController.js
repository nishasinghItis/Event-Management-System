import Membership from '../models/Membership.js';

const calculateExpiryDate = (startDate, duration) => {
  const expiry = new Date(startDate);
  switch (duration) {
    case '6 months':
      expiry.setMonth(expiry.getMonth() + 6);
      break;
    case '1 year':
      expiry.setFullYear(expiry.getFullYear() + 1);
      break;
    case '2 years':
      expiry.setFullYear(expiry.getFullYear() + 2);
      break;
  }
  return expiry;
};

export const createMembership = async (req, res) => {
  try {
    const { duration } = req.body;

    if (!duration || !['6 months', '1 year', '2 years'].includes(duration)) {
      return res.status(400).json({ message: 'Valid duration is required' });
    }

    const existingMembership = await Membership.findOne({ userId: req.user.id, status: 'active' });
    if (existingMembership) {
      return res.status(400).json({ message: 'Active membership already exists' });
    }

    const membershipNumber = 'MEM' + Date.now() + Math.floor(Math.random() * 1000);
    const startDate = new Date();
    const expiryDate = calculateExpiryDate(startDate, duration);

    const membership = await Membership.create({
      membershipNumber,
      userId: req.user.id,
      duration,
      startDate,
      expiryDate
    });

    res.status(201).json({ message: 'Membership created successfully', membership });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getMembershipByNumber = async (req, res) => {
  try {
    const { membershipNumber } = req.params;

    if (!membershipNumber) {
      return res.status(400).json({ message: 'Membership number is required' });
    }

    const membership = await Membership.findOne({ membershipNumber }).populate('userId', 'name email');
    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    res.json({ membership });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getUserMembership = async (req, res) => {
  try {
    const membership = await Membership.findOne({ userId: req.user.id, status: 'active' });
    if (!membership) {
      return res.status(404).json({ message: 'No active membership found' });
    }

    res.json({ membership });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const extendMembership = async (req, res) => {
  try {
    const { membershipNumber, duration } = req.body;

    if (!membershipNumber || !duration || !['6 months', '1 year', '2 years'].includes(duration)) {
      return res.status(400).json({ message: 'Valid membership number and duration are required' });
    }

    const membership = await Membership.findOne({ membershipNumber });
    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    if (membership.status === 'cancelled') {
      return res.status(400).json({ message: 'Cannot extend cancelled membership' });
    }

    const newExpiryDate = calculateExpiryDate(membership.expiryDate, duration);
    membership.expiryDate = newExpiryDate;
    membership.status = 'active';
    await membership.save();

    res.json({ message: 'Membership extended successfully', membership });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const cancelMembership = async (req, res) => {
  try {
    const { membershipNumber } = req.body;

    if (!membershipNumber) {
      return res.status(400).json({ message: 'Membership number is required' });
    }

    const membership = await Membership.findOne({ membershipNumber });
    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    membership.status = 'cancelled';
    await membership.save();

    res.json({ message: 'Membership cancelled successfully', membership });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find().populate('userId', 'name email');
    res.json({ memberships });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
