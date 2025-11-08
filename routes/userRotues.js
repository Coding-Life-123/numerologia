import { Router } from "express";
import { getUsers, newUser } from "../controllers/userController.js";
import {
  validateNewUser,
  validateGetUsers,
} from "../validators/userValidator.js";

const router = Router();

router.get("/", validateGetUsers, getUsers);
router.post("/", validateNewUser, newUser);

export default router;
