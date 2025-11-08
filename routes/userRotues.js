import { Router } from "express";
import { getUsers, newUser } from "../controllers/userController.js";
import {
  validateNewUser,
} from "../validators/userValidator.js";

const router = Router();

router.get("/", getUsers);
router.post("/", validateNewUser, newUser);

export default router;
