import { AuthenticatedRequest } from '@/middlewares';
import { Response } from 'express';
import httpStatus from 'http-status';
import activitiesService from '../services/activities-service';

export async function getAllActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const allActivities = await activitiesService.findAllActivities();
    return res.status(httpStatus.OK).send(allActivities);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getActivityByDay(req: AuthenticatedRequest, res: Response) {
  const day = new Date(req.params.day);
  try {
    const activities = await activitiesService.findActivityByDay(day);
    res.status(httpStatus.OK).send(activities);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
