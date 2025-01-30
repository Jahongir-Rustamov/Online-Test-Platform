export async function ProtectTeacher(req, res, next) {
  if (req.user && req.user.role === "teacher") {
    next();
  } else {
    return res.status(403).json({ message: "Faqat Teacher kirishi mumkin ☣️" });
  }
}
