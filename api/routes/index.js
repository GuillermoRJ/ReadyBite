import { Router } from "express";
import productRoutes from "./productRoutes.js";
import clientRoutes from "./clientRoutes.js";

const router = Router();

router.use("/products", productRoutes);
router.use("/clients", clientRoutes);

export default router;
