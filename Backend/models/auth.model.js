import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is requried"],
      minlength: [6, "Password must be at least 6 characters long"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is requried"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["student", "admin", "teacher"],
      default: "student",
    },
    TestWorkedOn: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "TestModel",
          required: true,
        },
        correctPercentage: {
          type: Number,
          required: true,
        },
        correctCount: {
          type: Number,
          required: true,
        },
        totalQuestions: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;
