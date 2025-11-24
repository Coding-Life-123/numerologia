import { Router } from "express";
import { dailyLecture, getNums, newNum } from "../controllers/numController.js";
import { validateLectura, validateNewNum } from "../validators/numValidator.js";

const router = Router();

router.get("/", getNums);
router.post("/nuevoNum", validateNewNum, newNum);
router.post("/lectura", validateLectura, dailyLecture);

export default router;
