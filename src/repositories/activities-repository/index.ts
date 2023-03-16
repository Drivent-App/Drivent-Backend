import { prisma } from "@/config";
import { Activities } from "@prisma/client";

type CreateActivitiesParam = Omit<Activities, "id" | "createdAt" | "UsersActivity">; 

async function findAllActivities(){
    return prisma.activities.findMany()
}

// async function findActivitiesByDay(date: Date){
//     return prisma.activities.findMany({
//         where:{
//         date: date
//         }
//     })
// }


async function createActivities({lectureName,data,numberVacancies,local}:CreateActivitiesParam ) : Promise<Activities>{
    
    return prisma.activities.create({
    data:{
        lectureName,
        data,
        numberVacancies,
        local,
    }
})
}

const activitiesRepotory= {
    findAllActivities
}

export default activitiesRepotory