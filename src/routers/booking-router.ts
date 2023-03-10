import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { bookingRoom, listBooking, changeBooking, getBookingbyRoom } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("", listBooking)
  .get("/:roomId", getBookingbyRoom)
  .post("", bookingRoom)
  .put("/:bookingId", changeBooking);

export { bookingRouter };
