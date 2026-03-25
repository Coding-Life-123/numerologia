import { Router } from "express";
import { crearPreferencia, recibirNotificacion, verificarPago }
    from "../controllers/mercadopagoController.js";
import { validarJWT } from "../middlewares/authJWT.js";
const router = Router();
router.post("/create-preference", validarJWT, crearPreferencia);
router.get("/verify-payment", validarJWT, verificarPago);
router.post("/webhook", recibirNotificacion);
router.get("/webhook", recibirNotificacion);
export default router;