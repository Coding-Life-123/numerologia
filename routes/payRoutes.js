import { Router } from "express";
import { newPayment } from "../controllers/payController.js";

const router = Router();

router.post("/:id", newPayment);

export default router