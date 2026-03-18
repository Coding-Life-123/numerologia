import { Router } from "express";
import { deletePayment, getEstado, getPayment, newPayment } from "../controllers/payController.js";
import { validateDeletePay, validatePayUser } from "../validators/payValidator.js";
import { validarAdminJWT, validarJWT } from "../middlewares/authJWT.js";

const router = Router();

/**
 * @swagger
 * /api/pagos/{id}:
 *   post:
 *     summary: Registrar un nuevo pago
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Pago registrado y membresía activada
 */
router.post("/:id", validatePayUser, validarJWT, newPayment);

/**
 * @swagger
 * /api/pagos/{id}:
 *   get:
 *     summary: Obtener pagos de un usuario
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de pagos del usuario
 */
router.get("/:id", validatePayUser, validarJWT, getPayment);

/**
 * @swagger
 * /api/pagos:
 *   get:
 *     summary: Obtener todos los pagos (Solo Admin)
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos los pagos
 */
router.get("/", validarAdminJWT, getPayment);

/**
 * @swagger
 * /api/pagos/estado/{id}:
 *   get:
 *     summary: Consultar estado de pago/membresía
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos de la membresía
 */
router.get("/estado/:id", validatePayUser, validarJWT, getEstado);

/**
 * @swagger
 * /api/pagos/{id}/{pay}:
 *   delete:
 *     summary: Eliminar un pago (Solo Admin)
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: pay
 *         required: true
 *         description: ID del pago a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pago eliminado
 */
router.delete("/:id/:pay", validateDeletePay, validarAdminJWT, deletePayment);

export default router