import { Router } from "express";
import { deletePayment, getEstado, getPayment, newPayment } from "../controllers/payController.js";
import { validateDeletePay, validatePayUser } from "../validators/payValidator.js";

const router = Router();

router.post("/:id", validatePayUser, newPayment);
router.get("/:id", validatePayUser, getPayment);
router.delete("/:id/:pay", validateDeletePay, deletePayment);
router.get("/estado/:id", validatePayUser, getEstado);

export default router