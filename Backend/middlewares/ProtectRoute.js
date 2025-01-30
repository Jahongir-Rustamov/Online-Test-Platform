import jwt from "jsonwebtoken";
import { config } from "dotenv";
import UserModel from "../models/auth.model.js";
config();
export async function ProtectRoute(req, res, next) {
  try {
    const token = req.cookies["Study_Platform"];
    if (!token) {
      return res.status(401).json({ message: "Sizda token yo'q.Tizimga kiring ‼️" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    const user = await UserModel.findById(decode.UserId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found 🙅‍♂️" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error with protectRoute Middleware:", error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi ❌" });
  }
}
