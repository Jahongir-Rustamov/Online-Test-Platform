export async function ParentsRoute(req, res, next) {
  if (req.user && req.user.role === "parent") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Faqat Ota-Onalar kirishi mumkin 👪" });
  }
}
