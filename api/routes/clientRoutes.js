import { Router } from "express";
import { createClient, editClient } from "../controllers/clientController.js";

const router = Router();

router.post("/", createClient);
router.put("/:id", editClient);

export default router;
