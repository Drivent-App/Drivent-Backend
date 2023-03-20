import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getActivityByDay, getAllActivities } from '@/controllers/activities-controller';
const activitiesRouter = Router();

activitiesRouter
.all('/*', authenticateToken)
.get('/', getAllActivities)
.get('/:day', getActivityByDay);

export { activitiesRouter };
