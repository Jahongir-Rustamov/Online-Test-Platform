import express from "express";
import { CreateTest, DeleteTest } from "../controller/TeacherController.js";
import { ProtectRoute } from "../middlewares/ProtectRoute.js";
import { ProtectTeacher } from "../middlewares/ProtectTeacher.js";

const router = express.Router();

router.post("/create_test", ProtectRoute, ProtectTeacher, CreateTest);

router.delete("/delete_test/:id", ProtectRoute, ProtectTeacher, DeleteTest);

export default router;
