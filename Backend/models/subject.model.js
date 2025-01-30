import mongoose from "mongoose";

const Subject_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    _id: {
      type: String,
      required: true,
      trim: true,
    },
    Mytests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestModel",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const subjectModel = mongoose.model("subjectModel", Subject_schema);

export default subjectModel;
