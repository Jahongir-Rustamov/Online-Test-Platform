import subjectModel from "../models/subject.model.js";
import UserModel from "../models/auth.model.js";
export async function getAllTest(req, res) {
  try {
    let tests = await subjectModel.find({}).populate({
      path: "Mytests",
    });

    let subjectsWithTeachers = await Promise.all(
      tests.map(async (subject) => {
        const teacher = await UserModel.findOne({ _id: subject._id }).select(
          "name"
        );
        return {
          _id: subject._id,
          name: subject.name,
          teacherName: teacher ? teacher.name : "🙅‍♂️",
          testsCount: subject.Mytests.length,
        };
      })
    );

    res.status(200).json({ subjects: subjectsWithTeachers });
  } catch (error) {
    console.log("Error in getAllTest controller:", error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi ❌" });
  }
}

export async function GetMyTests(req, res) {
  try {
    const { subjectID } = req.params;
    const tests = await subjectModel
      .findOne({ _id: subjectID })
      .select("Mytests")
      .populate("Mytests");

    if (tests) {
      const sanitizedTests = {
        Mytests: tests.Mytests,
      };

      res.status(200).json(sanitizedTests);
    } else {
      res.status(404).json({ message: "Subject topilmadi" });
    }
  } catch (error) {
    console.log("Error in GetMyTests controller:", error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi ❌" });
  }
}
