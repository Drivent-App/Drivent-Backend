import { prisma } from '@/config';
import { Activities } from '@prisma/client';


type ActivityDate = Omit<
  Activities,
  'id' | 'lectureName' | 'numberVacancies' | 'local' | 'created_at' | 'UsersActivity'
>;

async function getAllActivities() {
  return prisma.activities.findMany();
}

async function getActivityByDay(day: Date) {
  return prisma.activities.findMany({
    where: {
      day,
    },
  });
}

const activitiesRepository = {
  getActivityByDay,
  getAllActivities,
};

export default activitiesRepository;
