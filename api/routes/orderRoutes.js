import { Router } from "express";
import {
  createOrder,
  getOrderById,
  getOrders,
  deleteOrder,
} from "../controllers/orderController.js";

const router = Router();

router.post("/", createOrder);
router.get("/:id", getOrderById);
router.get("/", getOrders);
router.delete("/:id", deleteOrder);

export default router;
