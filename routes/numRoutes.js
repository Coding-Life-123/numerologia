import { Router } from "express";
import { dailyLecture, getLecture, mainLecture } from "../controllers/numController.js";
import { validateLectura } from "../validators/numValidator.js";

const router = Router();

router.get("/:id", getLecture);
router.get("/:id/:lectureId", getLecture);
router.post("/main-lecture/:id", validateLectura, mainLecture);
router.post("/lecture/:id", validateLectura, dailyLecture);

export default router;
