import express from "express";
import {
  CheckAuth,
  Login,
  LogOut,
  Signup,
} from "../controller/auth.controllers.js";
import { ProtectRoute } from "../middlewares/ProtectRoute.js";

const router = express.Router();

router.post("/signup", Signup);

router.post("/login", Login);

router.delete("/logout", LogOut);

router.get("/checkauth", ProtectRoute, CheckAuth);

export default router;
