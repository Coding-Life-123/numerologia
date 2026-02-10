import { Router } from "express";
import { deleteUser, estadoUser, getUsers, loginUser, newUser, updateUser } from "../controllers/userController.js";
import {
  validateDeleteUser,
  validateLogin,
  validateNewUser,
  validateUpdateUser,
} from "../validators/userValidator.js";
import { validarJWT } from "../middlewares/authJWT.js";

const router = Router();

router.post("/", validateNewUser, newUser);
router.post("/login", validateLogin, loginUser);
router.get("/", getUsers);
router.get("/:id", validarJWT, getUsers);
router.patch("/:id", validateUpdateUser, validarJWT, updateUser);
router.patch("/estado/:id", validarJWT, estadoUser)
router.delete("/:id", validateDeleteUser, validarJWT, deleteUser);

export default router;
