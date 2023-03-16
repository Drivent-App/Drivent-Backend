import {Router} from "express";
import { authenticateToken } from "@/middlewares";
import { getActivities, postActivities } from "@/controllers/activities-controller";

const activitiesRouter = Router();

activitiesRouter
    .all("/", authenticateToken)
    .get("/", getActivities)
    // .post("/", postActivities);

export {activitiesRouter};
