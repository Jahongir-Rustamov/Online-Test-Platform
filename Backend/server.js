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
import GetStudents from "./routes/GetAllStudents.js";
import { connectDB } from "./Databases/db.js";
import cors from "cors";
const app = express();
config();
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  /^http:\/\/192\.168\.\d+\.\d+:\d+$/, // 192.168.x.x manzillar uchun
  /^http:\/\/10\.\d+\.\d+\.\d+:\d+$/,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", AuthSections);
app.use("/api/admin", AdminSections);
app.use("/api/teacher", TeacherSections);
app.use("/api/get_tests", GetAllOfTests);
app.use("/api/student", StudentsSections);
app.use("/api/get/Statistics", GetStatistics);
app.use("/api/profile", ProfileSection);
app.use("/api", GetStudents);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  connectDB();
  console.log(`Server running on port: ${port}`);
});
