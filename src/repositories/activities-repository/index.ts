import { prisma } from "@/config";

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

async function getActivityById(id: number) {
  return prisma.activities.findFirst({
    where: {
      id,
    },
  });
}

async function getActivityByUserId(userId: number) {
  return prisma.usersActivity.findMany({
    where: {
      userId,
    },
    include: {
      Activities: true,
    }
  });
}

async function insertActivity(userId: number, activityId: number, vacancies: number) {
  await prisma.activities.update({
    where: {
      id: activityId
    },
    data: {
      numberVacancies: vacancies
    }
  });
  return prisma.usersActivity.create({
    data: {
      userId,
      activityId,
    }
  });
}

const activitiesRepository = {
  getActivityByDay,
  getAllActivities,
  getActivityById,
  getActivityByUserId,
  insertActivity,
};

export default activitiesRepository;
