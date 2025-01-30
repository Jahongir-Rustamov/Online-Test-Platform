import express from "express";
import { ProtectRoute } from "../middlewares/ProtectRoute.js";
import {
  ChangePassword,
  createRole,
  createSubject,
  DeleteTeacher,
  GetAllTeachers,
  GetChangedTeachers,
} from "../controller/adminController.js";
import { ProtectAdmin } from "../middlewares/ProtectAdmin.js";

const router = express.Router();

router.put("/create_role", ProtectRoute, ProtectAdmin, createRole);

router.post("/create_subject", ProtectRoute, ProtectAdmin, createSubject);

router.get("/getAllTeachers", ProtectRoute, ProtectAdmin, GetAllTeachers);

router.delete("/delete_teacher/:id", ProtectRoute, ProtectAdmin, DeleteTeacher);

router.put("/change_info/:id", ProtectRoute, ProtectAdmin, ChangePassword);

router.get(
  "/changed_with_role_teachers",
  ProtectRoute,
  ProtectAdmin,
  GetChangedTeachers
);

export default router;
