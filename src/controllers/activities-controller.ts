import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import activitiesService from "../services/activities-service";

export async function getAllActivities(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const allActivities = await activitiesService.findAllActivities(userId);
    return res.status(httpStatus.OK).send(allActivities);
  } catch (error) {
    if(error.name === "ForbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getActivityByDay(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const day = new Date(req.params.day);
  try {
    const activities = await activitiesService.findActivityByDay(userId, day);
    res.status(httpStatus.OK).send(activities);
  } catch (error) {
    if(error.name === "ForbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function enrollActivity(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { activityId } = req.body;
    const userActivity = await activitiesService.createUserActivity(userId, activityId);
    return res.status(httpStatus.OK).send(userActivity);
  } catch(error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.CONFLICT);
  }
}

export async function getUserActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const userActivities = await activitiesService.findActivitiesByUser(userId);
    return res.status(httpStatus.OK).send(userActivities);
  } catch(error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
