import express from "express";
import { ProtectRoute } from "../middlewares/ProtectRoute.js";
import { ProtectAdmin } from "../middlewares/ProtectAdmin.js";
import { DeleteStudent, GetAllStudents } from "../controller/adminController.js";

const router = express.Router();

router.get("/get_all_students", ProtectRoute, ProtectAdmin, GetAllStudents);

router.delete("/delete_student/:id", ProtectRoute, ProtectAdmin, DeleteStudent);

export default router;
