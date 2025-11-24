import { Router } from "express";
import { deleteUser, estadoUser, getUsers, newUser, updateUser } from "../controllers/userController.js";
import {
  validateNewUser,
  validateUpdateUser,
} from "../validators/userValidator.js";

const router = Router();

router.post("/", validateNewUser, newUser);
router.get("/", getUsers);
router.get("/:id", getUsers);
router.patch("/:id", validateUpdateUser, updateUser);
router.patch("/estado/:id", estadoUser)
router.delete("/:id", validateUpdateUser, deleteUser);

export default router;
