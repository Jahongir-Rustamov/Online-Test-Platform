import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import AuthSections from "./routes/AuthSections.route.js";
import AdminSections from "./routes/AdminSections.route.js";
import TeacherSections from "./routes/TeacherSections.route.js";
import GetAllOfTests from "./routes/GetAllTests.route.js";
import StudentsSections from "./routes/StudentsSections.route.js";
import ProfileSection from "./routes/ProfileSection.route.js";
import GetStatistics from "./routes/GetStatistics.js";
import { connectDB } from "./Databases/db.js";
import path from "path";
const app = express();
config();

app.use(express.json());
app.use(cookieParser());
const __dirname = path.resolve();
app.use("/api/auth", AuthSections);
app.use("/api/admin", AdminSections);
app.use("/api/teacher", TeacherSections);
app.use("/api/get_tests", GetAllOfTests);
app.use("/api/student", StudentsSections);
app.use("/api/get/Statistics", GetStatistics);
app.use("/api/profile", ProfileSection);
if (process.env.Node_Env === "production") {
  app.use(express.static(path.join(__dirname, "/Frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
  });
}
const port = process.env.port || 3000;
app.listen(port, () => {
  connectDB();
  console.log(`Server running on port :${port}`);
});
