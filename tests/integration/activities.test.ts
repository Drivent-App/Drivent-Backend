import app, { init } from "@/app";
import { prisma } from "@/config";
import faker from "@faker-js/faker";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import { cleanDb, generateValidToken } from "../helpers";
import { createEnrollmentWithAddress,
    createUser,
    createTicketType,
    createTicket,
    createPayment,
    createTicketTypeWithHotel,
    createTicketTypeRemote,    
    createActivities
     } from "../factories";
import { TicketStatus } from "@prisma/client";
import activitiesService from "@/services/activities-service";


beforeAll(async () => {
    await init();
  });
  
beforeEach(async () => {
    await cleanDb();
  });

const server = supertest(app);

describe("GET /activities", () => {
    it("should respond with status 401 if no token is given", async () => {
      const response = await server.get("/activities");
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  
    it("should respond with status 401 if given token is not valid", async () => {
      const token = faker.lorem.word();
  
      const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  
    it("should respond with status 401 if there is no session for given token", async () => {
      const userWithoutSession = await createUser();
      const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
  
      const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe("when token is valid", ()=>{
    
    it("should respond with status 403 when user doesnt have an enrollment yet", async()=>{
        const user = await createUser()
        const token = await generateValidToken(user)

        const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);

        expect(response.status).toEqual(httpStatus.FORBIDDEN);
    });
    it("should respond with status 403 when user has no ticket", async()=>{
        const user = await createUser();
        const token = await generateValidToken(user);
        const enrollment = await createEnrollmentWithAddress(user);

        const response = await server.get("/activities").set("Authorization", `Bearer ${token}`)

        expect(response.status).toEqual(httpStatus.FORBIDDEN);
    });
    it("should respond with status 403 when user has not paid the ticket", async()=>{
        const user = await createUser()
        const token = await generateValidToken(user)
        const enrollment = await createEnrollmentWithAddress(user);
        const ticketType = await createTicketTypeWithHotel()
        const ticket = await createTicket(enrollment.id,ticketType.id,TicketStatus.RESERVED)

        const response = await server.get("/activities").set("Authorization", `Bearer ${token}`)

        expect(response.status).toEqual(httpStatus.FORBIDDEN);

    });
    it("should respond with status 403 when user has a remote ticket", async()=>{
        const user = await createUser()
        const token = await generateValidToken(user)
        const enrollment = await createEnrollmentWithAddress(user);
        const ticketType = await createTicketTypeRemote()
        const ticket = await createTicket(enrollment.id,ticketType.id,TicketStatus.PAID)
        const payment = await createPayment(ticket.id, ticketType.price);

        const response = await server.get("/activities").set("Authorization", `Bearer ${token}`)

        expect(response.status).toEqual(httpStatus.FORBIDDEN);

    });

    it("should respond with status 404 when there is no activities", async()=>{
        const user = await createUser()
        const token = await generateValidToken(user)
        const enrollment = await createEnrollmentWithAddress(user);
        const ticketType = await createTicketTypeWithHotel()
        const ticket = await createTicket(enrollment.id,ticketType.id,TicketStatus.PAID)
        const payment = await createPayment(ticket.id, ticketType.price);

        const response = await server.get("/activities").set("Authorization", `Bearer ${token}`)

        expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it("should respond with status 200 with a valid body", async()=>{
        const user = await createUser()
        const token = await generateValidToken(user)
        const enrollment = await createEnrollmentWithAddress(user);
        const ticketType = await createTicketTypeWithHotel()
        const ticket = await createTicket(enrollment.id,ticketType.id,TicketStatus.PAID)
        const payment = await createPayment(ticket.id, ticketType.price);

        const activity = await createActivities()
        const response = await server.get("/activities").set("Authorization", `Bearer ${token}`)

        expect(response.status).toEqual(httpStatus.OK);
        expect(response.body).toEqual([{
            id: activity.id,
            lectureName: activity.lectureName,
            day: activity.day.toISOString(),
            timeStart: activity.timeStart,
            timeEnd: activity.timeEnd,
            numberVacancies: activity.numberVacancies,
            local: activity.local,
            createdAt: activity.createdAt.toISOString(),
            updatedAt: activity.updatedAt.toISOString(),
        }])
    });
});
});

describe("GET /activities/:day", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/activities/2023-08-23T03:00:00.000Z");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/activities/2023-08-23T03:00:00.000Z").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/activities/2023-08-23T03:00:00.000Z").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", ()=>{
  
  it("should respond with status 403 when user doesnt have an enrollment yet", async()=>{
      const user = await createUser()
      const token = await generateValidToken(user)

      const response = await server.get("/activities/2023-08-23T03:00:00.000Z").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.FORBIDDEN);
  });
  it("should respond with status 403 when user has no ticket", async()=>{
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);

      const response = await server.get("/activities/2023-08-23T03:00:00.000Z").set("Authorization", `Bearer ${token}`)

      expect(response.status).toEqual(httpStatus.FORBIDDEN);
  });
  it("should respond with status 403 when user has not paid the ticket", async()=>{
      const user = await createUser()
      const token = await generateValidToken(user)
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel()
      const ticket = await createTicket(enrollment.id,ticketType.id,TicketStatus.RESERVED)

      const response = await server.get("/activities/2023-08-23T03:00:00.000Z").set("Authorization", `Bearer ${token}`)

      expect(response.status).toEqual(httpStatus.FORBIDDEN);

  });
  it("should respond with status 403 when user has a remote ticket", async()=>{
      const user = await createUser()
      const token = await generateValidToken(user)
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeRemote()
      const ticket = await createTicket(enrollment.id,ticketType.id,TicketStatus.PAID)
      const payment = await createPayment(ticket.id, ticketType.price);

      const response = await server.get("/activities/2023-08-23T03:00:00.000Z").set("Authorization", `Bearer ${token}`)

      expect(response.status).toEqual(httpStatus.FORBIDDEN);

  });

  it("should respond with status 404 when there is no activities", async()=>{
      const user = await createUser()
      const token = await generateValidToken(user)
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel()
      const ticket = await createTicket(enrollment.id,ticketType.id,TicketStatus.PAID)
      const payment = await createPayment(ticket.id, ticketType.price);

      const response = await server.get("/activities/2023-08-23T03:00:00.000Z").set("Authorization", `Bearer ${token}`)

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
  });
  
  it("should respond with status 200 with a valid body", async()=>{
      const user = await createUser()
      const token = await generateValidToken(user)
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel()
      const ticket = await createTicket(enrollment.id,ticketType.id,TicketStatus.PAID)
      const payment = await createPayment(ticket.id, ticketType.price);

      const activity = await createActivities()
      const response = await server.get(`/activities/${activity.day.toISOString()}`).set("Authorization", `Bearer ${token}`)

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual([{
          id: activity.id,
          lectureName: activity.lectureName,
          day: activity.day.toISOString(),
          timeStart: activity.timeStart,
          timeEnd: activity.timeEnd,
          numberVacancies: activity.numberVacancies,
          local: activity.local,
          createdAt: activity.createdAt.toISOString(),
          updatedAt: activity.updatedAt.toISOString(),
      }])
  });
});
});


