import { Router } from "express";
import productRoutes from "./productRoutes.js";
import customerRoutes from "./customerRoutes.js";

const router = Router();

router.use("/products", productRoutes);
router.use("/customers", customerRoutes);

export default router;
