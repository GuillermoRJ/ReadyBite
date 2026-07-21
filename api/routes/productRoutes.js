import { Router } from "express";
import { createProduct, deleteProduct, editProduct, getProductById, getProducts } from "../controllers/productController.js";

const router = Router();

router.post("/", createProduct);
router.get("/:id", getProductById);
router.get("/", getProducts);
router.put("/:id", editProduct);
router.delete("/:id", deleteProduct);

export default router;
