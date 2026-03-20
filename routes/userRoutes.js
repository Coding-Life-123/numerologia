import { Router } from "express";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - nombre
 *       properties:
 *         nombre:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *         role:
 *           type: string
 *           enum: [user, admin]
 *         estado:
 *           type: string
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 */
import { deleteUser, estadoUser, getUsers, loginUser, newUser, updateUser, requestPasswordReset, resetPasswordUser } from "../controllers/userController.js";
import {
  validateDeleteUser,
  validateLogin,
  validateNewUser,
  validateUpdateUser,
} from "../validators/userValidator.js";
import { validarAdminJWT, validarJWT } from "../middlewares/authJWT.js";

const router = Router();

/**
 * @swagger
 * /api/usuarios/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       500:
 *         description: Error del servidor
 */
router.post("/register", validateNewUser, newUser);

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales incorrectas
 */
router.post("/login", validateLogin, loginUser);

/**
 * @swagger
 * /api/usuarios/request-reset-password:
 *   post:
 *     summary: Solicitar código de recuperación de contraseña
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Código enviado al correo
 *       404:
 *         description: Usuario no encontrado
 */
router.post("/request-reset-password", requestPasswordReset);

/**
 * @swagger
 * /api/usuarios/reset-password:
 *   post:
 *     summary: Restablecer contraseña con código
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       400:
 *         description: Código inválido o expirado
 */
router.post("/reset-password", resetPasswordUser);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener lista de usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/", validarAdminJWT, getUsers);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener usuario por ID (Solo Admin)
 *     tags: [Usuarios]
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
 *         description: Datos del usuario
 */
router.get("/:id", validarAdminJWT, getUsers);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   patch:
 *     summary: Actualizar usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
router.patch("/:id", validateUpdateUser, validarJWT, updateUser);

/**
 * @swagger
 * /api/usuarios/estado/{id}:
 *   patch:
 *     summary: Cambiar estado del usuario
 *     tags: [Usuarios]
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
 *         description: Estado actualizado
 */
router.patch("/estado/:id", validarJWT, estadoUser)

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Usuarios]
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
 *         description: Usuario eliminado
 */
router.delete("/:id", validateDeleteUser, validarJWT, deleteUser);

export default router;
