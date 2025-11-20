import UserModel from "../models/auth.model.js";

export async function GetProfile(req, res) {
  try {
    const user = req.user;
    const infos = await UserModel.findById(user._id).populate(
      "TestWorkedOn._id"
    );
    res.status(200).json(infos);
  } catch (error) {
    console.log("Error in CheckAuth controller:", error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi ❌" });
  }
}

export async function GetMyChildrenProfile(req, res) {
  try {
    const parent = req.user;
    const infos = await UserModel.findById(parent._id);
    const student =await UserModel.find({_id:infos.studentId}).populate("TestWorkedOn._id")
    console.log(student);
    if (!student) {
      return res.status(404).json({ message: "Student Infoa not found🎉" });
    } 
    res.status(200).json(student);
  } catch (error) {
    console.log("Error in GetMyChildrenProfile controller:", error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi ❌" });
  }
}
