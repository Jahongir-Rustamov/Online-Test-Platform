import subjectModel from "../models/subject.model.js";
import TestModel from "../models/TotalTests.model.js";

export async function CreateTest(req, res) {
  try {
    const user = req.user;
    const { testData } = req.body;
    const { title, questionsMassive } = testData;

    // Ma'lumotlar validatsiyasi

    if (!title || !questionsMassive) {
      return res
        .status(400)
        .json({ message: "Ma'lumotlarni to'liq kiriting ⚠️" });
    }

    if (!Array.isArray(questionsMassive) || questionsMassive.length === 0) {
      return res.status(400).json({ message: "Savollar bo'lishi shart  ⚠️" });
    }

    for (const question of questionsMassive) {
      if (
        !question.questionText ||
        !Array.isArray(question.options) ||
        question.options.length < 2
      ) {
        return res.status(400).json({
          message: "Eng kamida 2 ta variant bo'lishi kerak ⚠️",
        });
      }

      const hasCorrectOption = question.options.some(
        (option) => option.isCorrect
      );
      if (!hasCorrectOption) {
        return res.status(400).json({
          message: "Har bir savolda bitta to'g'ri javob bo'lishi kerak ⚠️",
        });
      }
    }

    // Subject'ni topish
    const subject = await subjectModel.findOne({ _id: user._id });
    if (!subject) {
      return res.status(404).json({ message: "Bu Fan topilmadi ❎" });
    }

    // Test yaratish
    const createTest = await TestModel.create({
      title,
      teacher: user._id,
      questionsMassive,
    });

    if (!createTest) {
      return res.status(500).json({ message: "Test yaratib bo'lmadi ❌" });
    }

    // Subject'ga testni qo'shish
    await subjectModel.findOneAndUpdate(
      { _id: user._id },
      {
        $push: {
          Mytests: createTest._id,
        },
      }
    );

    res.status(201).json({
      message: `Test "${createTest.title}" created successfully ✅`,
      data: createTest,
    });
  } catch (error) {
    console.error("Error in CreateTest:", error);
    res.status(500).json({ message: "Serverda xatolik yuz berdi ❌" });
  }
}

export async function DeleteTest(req, res) {
  try {
    const { id } = req.params;
    const user = req.user;
    const test = await TestModel.findById(id);
    if (!test) {
      return res.status(404).json({ message: "Test topilmadi" });
    }

    if (user._id.toString() !== test.teacher.toString()) {
      return res
        .status(403)
        .json({ message: "Sizda bu testni o'chirish huquqi yo'q" });
    }
    // Testni o'chirish
    await TestModel.findByIdAndDelete(id);
    const subject = await subjectModel.findOne({ _id: user._id });

    if (!subject) {
      return res.status(404).json({ message: "Subject topilmadi" });
    }
    subject.Mytests = subject.Mytests.filter((sub) => sub.toString() !== id);
    await subject.save();
    res.status(200).json({ message: "Test muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("Error in DeleteSubject:", error);
    res.status(500).json({ message: "Serverda xatolik yuz berdi ❌" });
  }
}
