import express from "express";
import { getAllTest, GetMyTests } from "../controller/getAllTestController.js";

const router = express.Router();

router.get("/tests", getAllTest);

router.get("/getMytest/:subjectID", GetMyTests);

export default router;
