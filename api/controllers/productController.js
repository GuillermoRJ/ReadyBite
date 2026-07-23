import Product from "../models/product.js";

const createProduct = async (req, res) => {
  try {
    const { name, type, price } = req.body;
    const product = new Product({
      name,
      type,
      price,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const user = await Product.findOne({ productId: req.params.id }).populate(
      "productId",
      "name",
    );
    if (!user)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  const { page = 1, limit = 10, sort = "created_at" } = req.query;
  try {
    const products = await Product.find()
      .populate("productId","name");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const editProduct = async (req, res) => {
  try {
    const updates = req.body;
    const targetId = Number(req.params.id);
    const product = await Product.findOneAndUpdate({ productId: targetId }, updates, {
      new: true,
    });
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ productId: req.params.id });
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export {
  createProduct,
  getProductById,
  getProducts,
  editProduct,
  deleteProduct,
};
