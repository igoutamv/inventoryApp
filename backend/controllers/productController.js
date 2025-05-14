import Product from "../models/Product.js";
import Log from "../models/Log.js";

// @desc    Delete a product
export const deleteProduct = async (req, res) => {
  console.log("Requested to delete product with ID:", req.params.id);

  try {
    const deletedItem = await Product.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found try again" });
    }

    // ✅ Log the delete action
    await Log.create({ action: "Deleted", itemName: deletedItem.name });

    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
};

// @desc    Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Add a new product
export const addProduct = async (req, res) => {
  const { name, quantity, price, category } = req.body;
  try {
    const newProduct = new Product({ name, quantity, price, category });
    const savedProduct = await newProduct.save();

    // ✅ Log the add action
    await Log.create({ action: "Added", itemName: savedProduct.name });

    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Update a product
export const updateProduct = async (req, res) => {
  try {
    const updatedItem = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    // ✅ Log the update action
    await Log.create({ action: "Edited", itemName: updatedItem.name });

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error });
  }
};
