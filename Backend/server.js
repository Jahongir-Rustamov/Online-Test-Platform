import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
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

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:5173",
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Basic middleware
app.use(express.json());
app.use(cookieParser());

const __dirname = path.resolve();

// API Routes
app.use("/api/auth", AuthSections);
app.use("/api/admin", AdminSections);
app.use("/api/teacher", TeacherSections);
app.use("/api/get_tests", GetAllOfTests);
app.use("/api/student", StudentsSections);
app.use("/api/get/Statistics", GetStatistics);
app.use("/api/profile", ProfileSection);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/Frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  connectDB();
  console.log(`Server running on port: ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
