import express from "express";
import { ProtectRoute } from "../middlewares/ProtectRoute.js";
import {
  CheckAnswers,
  GetQuestions,
} from "../controller/StudentsSectionsController.js";

const router = express.Router();

router.post("/checkAnswers/:testID", ProtectRoute, CheckAnswers);

router.get("/get/questions/:id", ProtectRoute, GetQuestions);

export default router;
