import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createActivities(){
    return prisma.activities.create({
        data: {
        lectureName: faker.name.findName(),
        day: faker.datatype.datetime(),
        timeStart: faker.datatype.datetime(),
        timeEnd: faker.datatype.datetime(),
        numberVacancies: faker.datatype.number(),
        local: faker.name.findName()
        }
    });
}