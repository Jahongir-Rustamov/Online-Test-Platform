import generateToken from "../GenerateToken/generateToken.js";
import UserModel from "../models/auth.model.js";
import subjectModel from "../models/subject.model.js";
import bcryptjs from "bcryptjs";

export async function Signup(req, res) {
  try {
    const { email, password, name } = req.body;

    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ message: "Ma'lumotlarni to'liq kiriting ⚠️" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Yaroqsiz email 🙅‍♂️" });
    }

    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ message: "Foydalanuvchi ro'yhatdan o'tgan ❎" });
    }

    const newUser = await UserModel({
      email,
      password,
      name,
    });

    const salt = await bcryptjs.genSalt(10);
    newUser.password = await bcryptjs.hash(password, salt);
    const user = await newUser.save();

    // Generate Token here
    generateToken(user._id, res);

    // Check for subject association
    const HaveId = await subjectModel.findOne({ _id: user._id });
    const ID = HaveId ? true : false;

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      ID,
    });
  } catch (error) {
    console.log("Error in Signup:", error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi ❌" });
  }
}

export async function Login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Ma'lumotlarni to'liq kiriting ⚠️" });
    }

    const verify = await UserModel.findOne({ email });
    if (!verify) {
      return res.status(400).json({ message: "Error: password or email !" });
    }

    const lastverify = await bcryptjs.compare(password, verify.password);
    if (!lastverify) {
      return res.status(400).json({ message: "Error: password or email !" });
    }

    // Generate Token here
    generateToken(verify._id, res);

    // Check for subject association
    const HaveId = await subjectModel.findOne({ _id: verify._id });
    const ID = HaveId ? true : false;

    res.status(200).json({
      _id: verify._id,
      name: verify.name,
      email: verify.email,
      role: verify.role,
      ID,
    });
  } catch (error) {
    console.log("Error in Login:", error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi ❌" });
  }
}

export async function LogOut(req, res) {
  try {
    res.clearCookie("Study_Platform");
    res.status(200).json({ message: "LogOut Successfully 🎉" });
  } catch (error) {
    console.log("Error in LogOut:", error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi ❌" });
  }
}

export async function CheckAuth(req, res) {
  try {
    const HaveId = await subjectModel.findOne({ _id: req.user._id });
    const ID = HaveId ? true : false;
    const userData = req.user._doc || req.user;
    const response = {
      ...userData,
      ID,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log("Error in CheckAuth controller:", error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi ❌" });
  }
}
