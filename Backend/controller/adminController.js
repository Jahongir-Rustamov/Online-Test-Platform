import UserModel from "../models/auth.model.js";
import subjectModel from "../models/subject.model.js";
import TestModel from "../models/TotalTests.model.js";
import bcrypt from "bcryptjs";
export async function createRole(req, res) {
  try {
    const { t_email, t_name, role } = req.body;
    if (!t_email || !t_name || !role) {
      return res
        .status(400)
        .json({ message: "Ma'lumotlarni to'liq kiriting ⚠️" });
    }
    const userExist = await UserModel.findOne({ email: t_email }).select(
      "-password"
    );
    if (!userExist) {
      return res.status(400).json({ message: "Foydalanuvchi mavjud emas 🙅‍♂️" });
    }
    if (t_name.toLowerCase() !== userExist.name.toLowerCase()) {
      return res.status(400).json({ message: "Foydalanuvchi mavjud emas 🙅‍♂️" });
    }

    userExist.role = role;
    await userExist.save();
    res.status(200).json(userExist);
  } catch (error) {
    console.log("Error in createRole controller:", error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi ❌" });
  }
}

export async function createSubject(req, res) {
  try {
    const { subject_name, t_email, t_name } = req.body;
    if (!subject_name || !t_email || !t_name) {
      return res
        .status(400)
        .json({ message: "Ma'lumotlarni to'liq kiriting ⚠️" });
    }
    const userExist = await UserModel.findOne({ email: t_email }).select(
      "-password"
    );
    if (!userExist) {
      return res.status(400).json({ message: "Foydalanuvchi mavjud emas 🙅‍♂️" });
    }
    if (t_name.toLowerCase() !== userExist.name.toLowerCase()) {
      return res.status(400).json({ message: "Foydalanuvchi mavjud emas 🙅‍♂️" });
    }

    const select = userExist;
    const createS = await subjectModel.findOne({ _id: select._id });
    if (!createS) {
      const subject_new = await subjectModel.create({
        name: subject_name,
        _id: select._id,
      });
      return res.status(201).json(subject_new);
    } else {
      return res
        .status(400)
        .json({ message: "Bu foydalanuvchi uchun fan yaratilgan " });
    }
  } catch (error) {
    console.log("Error in createSubject controller:", error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi ❌" });
  }
}

export async function GetAllTeachers(req, res) {
  try {
    const teachers = await UserModel.find({ role: "teacher" });
    const subjects = await subjectModel.find({});

    // Faqat ID'lari mos keladigan `teacher` va `subject`larni olish
    const result = teachers
      .filter((teacher) =>
        subjects.some(
          (subject) => subject._id.toString() === teacher._id.toString()
        )
      )
      .map((teacher) => {
        const teacherSubjects = subjects.filter(
          (subject) => subject._id.toString() === teacher._id.toString()
        );

        return {
          _id: teacher._id,
          teacherName:
            teacher.name.charAt(0).toUpperCase() +
            teacher.name.slice(1).toLowerCase(),
          teacherRole: teacher.role,
          teacherEmail: teacher.email,
          subjects: teacherSubjects.map((subject) => ({
            subjectName: subject.name,
            subjectCount: subject.Mytests.length,
          })),
        };
      });
    const Admins = await UserModel.find(
      { role: "admin" },
      { name: 1, email: 1, role: 1 }
    );
    const OtherAdmins = Admins.filter(
      (admin) => admin._id.toString() !== req.user._id.toString()
    );

    const resluts2 = [...result, ...OtherAdmins];
    res.status(200).json(resluts2);
  } catch (error) {
    console.log("Error in GetAllTeachers controller:", error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi ❌" });
  }
}

export async function DeleteTeacher(req, res) {
  try {
    const { id } = req.params;
    await UserModel.findByIdAndDelete(id);
    await subjectModel.findByIdAndDelete({ _id: id });
    await TestModel.deleteMany({ teacher: id });
    res.status(200).json({ message: "Successfully deleted ✂️" });
  } catch (error) {
    console.log("Error in DeleteTeacher controller:", error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi ❌" });
  }
}

export async function ChangePassword(req, res) {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    if (!id) {
      return res.status(400).json({ message: "ID yetkazib berilmagan ⚠️" });
    }
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Ma'lumotlarni to'liq kiriting ⚠️" });
    }
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    const updatedTeacher = await UserModel.findByIdAndUpdate(
      id,
      { name, email, password: newPassword },
      { new: true }
    );

    // Foydalanuvchi mavjudligini tekshirish
    if (!updatedTeacher) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi 🙅‍♂️" });
    }
    const { password: _, ...teacherInfos } = updatedTeacher.toObject(); // Parolni olib tashlash
    res.status(200).json({
      message: "Ma'lumotlar muvaffaqiyatli yangilandi ✅",
      teacherInfos,
    });
  } catch (error) {
    console.log("Error in ChangePassword Controller:", error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi ❌" });
  }
}

export async function GetChangedTeachers(req, res) {
  try {
    const teachers = await UserModel.find({}).select("-password");
    const subjects = await subjectModel.find({});
    const result = subjects.reduce((acc, subject) => {
      const matchedTeacher = teachers.find(
        (teacher) =>
          subject._id.toString() === teacher._id.toString() &&
          teacher.role !== "teacher" &&
          teacher.role !== "admin"
      );
      if (matchedTeacher) {
        acc.push({
          teacher: matchedTeacher,
          subjectName: subject.name,
        });
      }
      return acc;
    }, []);
    res.status(200).json(result);
  } catch (error) {
    console.log("Error in GetChangedTeachers Controller:", error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi ❌" });
  }
}
