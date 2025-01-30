import express from "express";
import { ProtectRoute } from "../middlewares/ProtectRoute.js";
import { GetProfile } from "../controller/ProfileController.js";

const router = express.Router();

router.get("/get_infos_of_profile", ProtectRoute, GetProfile);

export default router;
