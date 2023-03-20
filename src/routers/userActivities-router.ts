import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import {
  getUserActivities,
} from "@/controllers/activities-controller";
const userActivitiesRouter = Router();

userActivitiesRouter
  .all("", authenticateToken)
  .get("", getUserActivities);

export { userActivitiesRouter };
