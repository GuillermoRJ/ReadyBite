import { Router } from "express";
import {
  createClient,
  getClientById,
  getClients,
  editClient,
  deleteClient,
} from "../controllers/clientController.js";

const router = Router();

router.post("/", createClient);
router.get("/:id", getClientById);
router.get("/", getClients);
router.put("/:id", editClient);
router.delete("/:id", deleteClient);

export default router;
