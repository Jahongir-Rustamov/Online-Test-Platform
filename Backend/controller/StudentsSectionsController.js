import UserModel from "../models/auth.model.js";
import TestModel from "../models/TotalTests.model.js";

export async function CheckAnswers(req, res) {
  try {
    const user = req.user;
    const { testID } = req.params;
    const { student_questionsMassive } = req.body;
    const ThisTest = await TestModel.findById(testID);

    if (!ThisTest) {
      return res.status(404).json({ message: "Test topilmadi" });
    }

    let TestMassive = [];
    let correctCount = 0;

    // Har bir savolni tekshirib chiqish
    ThisTest.questionsMassive.forEach((question) => {
      const studentAnswer = student_questionsMassive.find(
        (item) => item._id && item._id.toString() === question._id.toString()
      );

      if (studentAnswer) {
        const correctOption = question.options.find(
          (option) => option.isCorrect
        );

        // Javob to'g'riligini tekshirish
        if (
          studentAnswer.optionsID &&
          correctOption &&
          studentAnswer.optionsID.toString() === correctOption._id.toString()
        ) {
          TestMassive.push({
            questionText: question.questionText,
            correctOption: true,
            _id: studentAnswer.optionsID,
            totalOptions: question.options,
          });
          correctCount += 1;
        } else {
          TestMassive.push({
            questionText: question.questionText,
            correctOption: false,
            _id: studentAnswer.optionsID,
            totalOptions: question.options,
          });
        }
      }
    });

    // Natijalar
    const totalQuestions = ThisTest.questionsMassive.length;
    const correctPercentage = ((correctCount / totalQuestions) * 100).toFixed(
      2
    );

    // Foydalanuvchi ma'lumotlarini yangilash
    await UserModel.findOneAndUpdate(
      { _id: user._id },
      {
        $push: {
          TestWorkedOn: {
            _id: ThisTest._id,
            correctPercentage,
            totalQuestions,
            correctCount,
          },
        },
      }
    );

    // Javob qaytarish
    const datas = {
      message: "Javoblar tekshirildi",
      totalQuestions,
      correctCount,
      correctPercentage,
      TestMassive,
    };
    return res.status(200).json(datas);
  } catch (error) {
    console.log("Error in CheckAnswers Controller.js: ", error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi ❌" });
  }
}

export async function GetQuestions(req, res) {
  try {
    const { id } = req.params;
    let Savollar = await TestModel.findById(id);
    res.status(200).json(Savollar);
  } catch (error) {
    console.log("Error in GetQuestions Controller.js: ", error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi ❌" });
  }
}
