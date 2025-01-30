import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      optionText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
});

const TestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "UserModel",
    required: true,
  },
  questionsMassive: [QuestionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TestModel = mongoose.model("TestModel", TestSchema);

export default TestModel;
