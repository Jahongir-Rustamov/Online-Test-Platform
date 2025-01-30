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
