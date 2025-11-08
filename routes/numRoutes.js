import { Router } from "express";
import { getNums, newNum } from "../controllers/numController.js";
import { validateGetNums, validateNewNum } from "../validators/numValidator.js";

const router = Router();

router.get("/", getNums);
router.post("/", validateNewNum, newNum);

export default router;
