import jwt from "jsonwebtoken";
import { config } from "dotenv";
import UserModel from "../models/auth.model.js";
config();

export async function ProtectRoute(req, res, next) {
  try {
    // Cookie dan token olish
    const cookieToken = req.cookies["Study_Platform"];
    // Header dan token olish
    const authHeader = req.headers.authorization;
    const headerToken = authHeader && authHeader.split(" ")[1];

    // Agar ikkala usulda ham token topilmasa
    if (!cookieToken && !headerToken) {
      return res
        .status(401)
        .json({ message: "Sizda token yo'q.Tizimga kiring ‼️" });
    }

    // Token ni tekshirish (cookie yoki header dan)
    const token = cookieToken || headerToken;
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const user = await UserModel.findById(decode.UserId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error with protectRoute Middleware:", error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi ❌" });
  }
}
