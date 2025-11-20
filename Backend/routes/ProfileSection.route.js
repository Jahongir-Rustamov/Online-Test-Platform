import express from "express";
import { ProtectRoute } from "../middlewares/ProtectRoute.js";
import {
  GetMyChildrenProfile,
  GetProfile,
} from "../controller/ProfileController.js";
import { ParentsRoute } from "../middlewares/ParentsRoute.js";

const router = express.Router();

router.get("/get_infos_of_profile", ProtectRoute, GetProfile);

router.get(
  "parent/get_infos_of_profile",
  ProtectRoute,
  ParentsRoute,
  GetMyChildrenProfile
);

export default router;
