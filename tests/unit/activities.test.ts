import { notFoundError } from "@/errors";
import { forbiddenError } from "@/errors/forbidden-error";
import activitiesRepository from "@/repositories/activities-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import activitiesService from "@/services/activities-service";
import faker from "@faker-js/faker"
describe("route all activities", () =>{

    it("user has no enrollment", async()=>{       
    
    jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce(() => undefined)
    const userId = 1   
    await expect(activitiesService.findAllActivities(userId)).rejects.toEqual(forbiddenError());

    });

    it("user has no ticket", async()=>{
    jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce(():any => {
        return {id:faker.datatype.number}
    })     
    jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementationOnce(()=>undefined)
    const userId = 1
       
    await expect(activitiesService.findAllActivities(userId,)).rejects.toEqual(forbiddenError()); 
    })

    it("user has ticket not paid", async()=>{ 
              
        jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce(():any => {
            return {id:faker.datatype.number}
        })

        jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementationOnce(():any=>{
          return  {status: "RESERVED"}
        })

        const userId = 1
        await expect(activitiesService.findAllActivities(userId,)).rejects.toEqual(forbiddenError());  
    })
    // it("user has a ticket is remote", async()=>{  

    //     jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce(():any => {
    //         return {id:faker.datatype.number}
    //     })

    //     jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementationOnce(():any=>{
    //       return  {status:"PAID", isRemote: true}
    //     })

    //     const userId = 1
    //     await expect(activitiesService.findAllActivities(userId)).rejects.toEqual(forbiddenError());  
    // })
    // it("when there is no activities", async()=>{    
    //     const userId = 1   
    //     jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce(():any => {
    //         return {id:faker.datatype.number}
    //     })

    //     jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementationOnce(():any=>{
    //       return  {status:"PAID", isRemote:false}
    //     })
    
    //     jest.spyOn(activitiesRepository, "getAllActivities").mockImplementationOnce(() => undefined)
    
    //     await expect(activitiesService.findAllActivities(userId)).rejects.toEqual(notFoundError());
    // })
    it("success", async()=>{       
        const userId = 1   
        jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce(():any => {
            return {id:faker.datatype.number}
        })

        jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementationOnce(():any=>{
          return  {status:"PAID", isRemote:false}
        })
        const activity = {
            id: faker.datatype.number(),
            lectureName: faker.name.findName(),
            day: faker.datatype.datetime().toISOString(),
            timeStart: faker.name.findName(), 
            timeEnd: faker.name.findName(), 
            numberVacancies: faker.datatype.number(),
            local: faker.name.findName(), 
            createdAt: faker.datatype.datetime().toISOString(), 
            updatedAt: faker.datatype.datetime().toISOString() 
        }
        jest.spyOn(activitiesRepository, "getAllActivities").mockImplementationOnce(():any => {
            return activity
        })
        const response = await activitiesService.findAllActivities(userId);
        expect(response).toEqual(activity) 
    })
});

describe("route activities by day", () =>{

   it("user has no enrollment", async()=>{       
    
    jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce(() => undefined)
    const day = new Date("2023-08-21T03:00:00.000Z")
    const userId = 1   
    await expect(activitiesService.findActivityByDay(userId, day)).rejects.toEqual(forbiddenError());

    });

    it("user has no ticket", async()=>{
    jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce(():any => {
        return {id:faker.datatype.number}
    })     
    jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementationOnce(()=>undefined)
    const day = new Date("2023-08-21T03:00:00.000Z")
    const userId = 1
       
    await expect(activitiesService.findActivityByDay(userId, day)).rejects.toEqual(forbiddenError()); 
    })

    it("user has ticket not paid", async()=>{ 
              
        jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce(():any => {
            return {id:faker.datatype.number}
        })

        jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementationOnce(():any=>{
          return  {status: "RESERVED"}
        })
        const day = new Date("2023-08-21T03:00:00.000Z")
        const userId = 1
        await expect(activitiesService.findActivityByDay(userId,day)).rejects.toEqual(forbiddenError());  
    })
//     it("user has a ticket is remote", async()=>{       

//     })
//     it("when there is no activities", async()=>{       

//     })
//     it("success", async()=>{       

//     })
});
