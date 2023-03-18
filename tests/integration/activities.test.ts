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
    generateCreditCardData,
    createTicketTypeWithHotel,
    createTicketTypeRemote    
     } from "../factories";
import { TicketStatus } from "@prisma/client";


beforeAll(async () => {
    await init();
  });
  
beforeEach(async () => {
    await cleanDb();
  });

  const server = supertest(app);

describe("GET /payments", () => {
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

    describe("when token is valid", async()=>{
    it("should respond with status 404 when user doesnt have an enrollment yet", async()=>{
        const user = await createUser()
        const token = await generateValidToken(user)

        const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);

        expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });
    it("responde with status 404 when user has no ticket", async()=>{
        const user = await createUser();
        const token = await generateValidToken(user);
        const enrollment = await createEnrollmentWithAddress(user);

        const response = await server.get("/activities").set("Authorization", `Bearer ${token}`)

        expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });
    it("responde with status 404 when user has not paid the ticket", async()=>{
        const user = await createUser()
        const token = await generateValidToken(user)
        const enrollment = await createEnrollmentWithAddress(user);
        const ticketType = await createTicketTypeWithHotel()
        const ticket = await createTicket(enrollment.id,ticketType.id,TicketStatus.RESERVED)

        const response = await server.get("/activities").set("Authorization", `Bearer ${token}`)

        expect(response.status).toEqual(httpStatus.NOT_FOUND);

    });
});

});