import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const generateToken = (UserId, res) => {
  const accessToken = jwt.sign({ UserId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "5d",
  });
  res.cookie("Study_Platform", accessToken, {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.Node_Env !== "development",
  });
};

export default generateToken;
