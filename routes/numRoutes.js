import { Router } from "express";
import { dailyLecture, getLecture, mainLecture } from "../controllers/numController.js";
import { validateLectura } from "../validators/numValidator.js";
import { validarJWT } from "../middlewares/authJWT.js";

const router = Router();

/**
 * @swagger
 * /api/producto/{id}:
 *   get:
 *     summary: Obtener lecturas por ID de usuario
 *     tags: [Lecturas]
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
 *         description: Lista de lecturas
 */
router.get("/:id", validarJWT, getLecture);

/**
 * @swagger
 * /api/producto/{id}/{lectureId}:
 *   get:
 *     summary: Obtener una lectura específica
 *     tags: [Lecturas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: lectureId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos de la lectura
 */
router.get("/:id/:lectureId", validarJWT, getLecture);

/**
 * @swagger
 * /api/producto/main-lecture/{id}:
 *   post:
 *     summary: Generar lectura principal (Gratis)
 *     tags: [Lecturas]
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
 *             properties:
 *               nombre:
 *                 type: string
 *               fecha_nacimiento:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Lectura generada
 */
router.post("/main-lecture/:id", validarJWT, validateLectura, mainLecture);

/**
 * @swagger
 * /api/producto/lecture/{id}:
 *   post:
 *     summary: Generar lectura diaria (Requiere membresía activa)
 *     tags: [Lecturas]
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
 *             properties:
 *               nombre:
 *                 type: string
 *               fecha_nacimiento:
 *                 type: string
 *                 format: date
 *               estado:
 *                 type: string
 *                 example: activo
 *     responses:
 *       201:
 *         description: Lectura diaria generada
 */
router.post("/lecture/:id", validarJWT, validateLectura, dailyLecture);

export default router;
