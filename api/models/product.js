import mongoose from "mongoose";
import { autoIncrementPlugin } from "../middlewares/autoIncrement.js";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre del producto es obligatorio"],
    trim: true,
  },
  type: {
    type: String,
    required: [true, "El tipo de producto es obligatorio"],
    enum: ["producto", "complemento"],
  },
  price: {
    type: Number,
    required: [true, "El precio es obligatorio"],
    min: [0, "El precio no puede ser negativo"],
  },
});

productSchema.plugin(autoIncrementPlugin, { inc_field: "productId" });

const Product = mongoose.model("Product", productSchema);

export default Product;
