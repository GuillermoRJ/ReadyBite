import Product from "../models/product.js";

const createProduct = async (req, res) => {
  try {
    const { name, description, photo, price } = req.body;
    const product = new Product({
      name,
      description,
      photo,
      price,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export { createProduct };
