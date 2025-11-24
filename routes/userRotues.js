import { Router } from "express";
import { getUsers, newUser, updateUser } from "../controllers/userController.js";
import {
  validateNewUser,
  validateUpdateUser,
} from "../validators/userValidator.js";

const router = Router();

router.post("/new-user", validateNewUser, newUser);
router.get("/", getUsers);
router.get("/:id", getUsers);
router.patch("/update-user/:id", validateUpdateUser, updateUser);
router.delete("/delete-user/:id", validateUpdateUser, deleteUser);

export default router;
