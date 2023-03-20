import { notFoundError } from '@/errors';
import { forbiddenError } from '@/errors/forbidden-error';
import activitiesRepository from '@/repositories/activities-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function findAllActivities(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw forbiddenError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket || ticket.status === 'RESERVED') {
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


async function findActivityByDay(userId:number,day: Date) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw forbiddenError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket || ticket.status === 'RESERVED') {
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

const activitiesService = {
  findActivityByDay,
  findAllActivities,
};

export default activitiesService;
