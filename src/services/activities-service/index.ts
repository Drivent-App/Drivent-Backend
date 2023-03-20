import { conflictError, notFoundError } from "@/errors";
import activitiesRepository from "@/repositories/activities-repository";
import dayjs from "dayjs";

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

async function createUserActivity(userId: number, activityId: number) {
  const activity = await activitiesRepository.getActivityById(activityId);

  if(!activity) {
    throw notFoundError();
  }

  const userActivities = await activitiesRepository.getActivityByUserId(userId);
  const sameDayActivities = userActivities.filter(item => new Date(item.Activities.day).getTime() === new Date(activity.day).getTime());
  const conflitingActivities = sameDayActivities.filter(item => ((parseInt(activity.timeStart) >= parseInt(item.Activities.timeStart)) && (parseInt(activity.timeStart) <= parseInt(item.Activities.timeEnd))) ||
                                                              ((parseInt(activity.timeEnd) >= parseInt(item.Activities.timeStart)) && (parseInt(activity.timeEnd) <= parseInt(item.Activities.timeEnd))));
  if(conflitingActivities.length !== 0) {
    throw conflictError("Já existem atividades nesse horário");
  }

  const vacancies = activity.numberVacancies - 1;

  return activitiesRepository.insertActivity(userId, activityId, vacancies);
}

async function findActivitiesByUser(userId: number) {
  const userActivities = await activitiesRepository.getActivityByUserId(userId);
  if(!userActivities) {
    throw notFoundError();
  }
  const userActivitiesId = userActivities.map(item => item.activityId);

  return userActivitiesId;
}

const activitiesService = {
  findActivityByDay,
  findAllActivities,
  createUserActivity,
  findActivitiesByUser
};

export default activitiesService;
