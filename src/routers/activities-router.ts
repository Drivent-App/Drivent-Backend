import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import {
  getActivityByDay,
  getAllActivities,
  enrollActivity,
} from "@/controllers/activities-controller";
const activitiesRouter = Router();

activitiesRouter
  .all("", authenticateToken)
  .get("", getAllActivities)
  .get("/:day", getActivityByDay)
  .post("", enrollActivity);

export { activitiesRouter };
