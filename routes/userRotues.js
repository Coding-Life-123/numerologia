import { Router } from "express";
import { deleteUser, estadoUser, getUsers, loginUser, newUser, updateUser } from "../controllers/userController.js";
import {
  validateDeleteUser,
  validateLogin,
  validateNewUser,
  validateUpdateUser,
} from "../validators/userValidator.js";

const router = Router();

router.post("/", validateNewUser, newUser);
router.post("/login", validateLogin, loginUser);
router.get("/", getUsers);
router.get("/:id", getUsers);
router.patch("/:id", validateUpdateUser, updateUser);
router.patch("/estado/:id", estadoUser)
router.delete("/:id", validateDeleteUser, deleteUser);

export default router;
