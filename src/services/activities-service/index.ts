import { notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository';

async function findAllActivities() {
  const allActivities = activitiesRepository.getAllActivities();

  if (!allActivities) {
    throw notFoundError();
  }
  return allActivities;
}
//validacoes (ticket presencial, pago e enrollment)

async function findActivityByDay(day: Date) {
  const activities = activitiesRepository.getActivityByDay(day);

  if (!activities) {
    throw notFoundError();
  }

  return activities;
}

const activitiesService = {
  findActivityByDay,
  findAllActivities,
};

export default activitiesService;
