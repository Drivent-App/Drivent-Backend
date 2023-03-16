import { notFoundError } from '@/errors';
import activitiesRepotory from '@/repositories/activities-repository';

async function findAllActivities() {
  const activites = await activitiesRepotory.findAllActivities();
  if (!activites) {
    throw notFoundError();
  }

  return activites;
}

const activitesService = {
    findAllActivities
}

export default activitesService