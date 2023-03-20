import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import {
  getActivityByDay,
  getAllActivities,
  enrollActivity,
  getUserActivities,
} from "@/controllers/activities-controller";
const activitiesRouter = Router();

activitiesRouter
  .all("", authenticateToken)
  .get("", getAllActivities)
  .get("/:day", getActivityByDay)
  .get("/:user", getUserActivities)
  .post("", enrollActivity);

export { activitiesRouter };
