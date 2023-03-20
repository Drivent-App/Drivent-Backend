import { conflictError, notFoundError } from "@/errors";
import { forbiddenError } from "@/errors/forbidden-error";
import activitiesRepository from "@/repositories/activities-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function findAllActivities(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw forbiddenError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket || ticket.status === "RESERVED") {
    throw forbiddenError();
  }
  if (ticket.TicketType.isRemote) {
    throw forbiddenError();
  }

  const allActivities = await activitiesRepository.getAllActivities();
  if (allActivities.length === 0) {
    throw notFoundError();
  }
  return allActivities;
}

async function findActivityByDay(userId: number, day: Date) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw forbiddenError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket || ticket.status === "RESERVED") {
    throw forbiddenError();
  }
  if (ticket.TicketType.isRemote) {
    throw forbiddenError();
  }
    
  const activities = await activitiesRepository.getActivityByDay(day);

  if (activities.length === 0) {
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
