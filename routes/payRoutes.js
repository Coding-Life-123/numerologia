import { Router } from "express";
import { deletePayment, getEstado, getPayment, newPayment } from "../controllers/payController.js";

const router = Router();

router.get("/", getPayment);
router.post("/:id", newPayment);
router.get("/:id", getPayment);
router.delete("/:id/:pay", deletePayment);
router.get("/estado/:id", getEstado);

export default router