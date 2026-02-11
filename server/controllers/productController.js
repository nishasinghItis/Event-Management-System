import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, stock } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ message: 'Price must be a valid positive number' });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      imageUrl,
      stock: stock || 0,
      vendorId: req.user.id
    });

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: 'approved' }).populate('vendorId', 'name businessName');
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendorId: req.user.id });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('vendorId', 'name businessName');
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, imageUrl, stock } = req.body;

    const product = await Product.findOne({ _id: id, vendorId: req.user.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (price && (isNaN(price) || price <= 0)) {
      return res.status(400).json({ message: 'Price must be a valid positive number' });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.imageUrl = imageUrl || product.imageUrl;
    product.stock = stock !== undefined ? stock : product.stock;

    await product.save();
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOneAndDelete({ _id: id, vendorId: req.user.id });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateProductStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const product = await Product.findByIdAndUpdate(id, { status }, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product status updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
