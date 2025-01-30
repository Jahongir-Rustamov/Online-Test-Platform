import express from "express";
import UserModel from "../models/auth.model.js";
import TestModel from "../models/TotalTests.model.js";
import subjectModel from "../models/subject.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const TeacherCount = await UserModel.countDocuments({ role: "teacher" });
    const StudentCount = await UserModel.countDocuments({ role: "student" });
    const TestsCount = await TestModel.countDocuments({});
    const SubjectsCount = await subjectModel.countDocuments({});
    res.status(200).json({
      TeacherCount,
      StudentCount,
      TestsCount,
      SubjectsCount,
    });
  } catch (error) {
    console.log("Error in createSubject controller:", error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi ❌" });
  }
});

export default router;
