import { Router } from "express";
import {
  createCustomer,
  getCustomerById,
  getCustomers,
  editCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";

const router = Router();

router.post("/", createCustomer);
router.get("/:id", getCustomerById);
router.get("/", getCustomers);
router.put("/:id", editCustomer);
router.delete("/:id", deleteCustomer);

export default router;
