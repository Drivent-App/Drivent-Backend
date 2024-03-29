import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import bookingService from "@/services/booking-service";
import hotelService from "@/services/hotels-service";

export async function listBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const booking = await bookingService.getBooking(userId);
    const hotel = await hotelService.getHotelsById(booking.Room.hotelId);
    return res.status(httpStatus.OK).send({
      id: booking.id,
      Room: booking.Room,
      Hotel: hotel
    });
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getBookingbyRoom(req: AuthenticatedRequest, res: Response) {
  try {
    const roomId = Number(req.params.roomId);
    
    return res.status(httpStatus.OK).send(await bookingService.getBookingbyRoom(roomId));
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function bookingRoom(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const { roomId } = req.body;

    if (!roomId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const booking = await bookingService.bookingRoomById(userId, Number(roomId));

    return res.status(httpStatus.OK).send({
      bookingId: booking.id,
    });
  } catch (error) {
    if (error.name === "CannotBookingError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function changeBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const bookingId = Number(req.params.bookingId);

    if (!bookingId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const { roomId } = req.body;

    if (!roomId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const booking = await bookingService.changeBookingRoomById(userId, Number(roomId));

    return res.status(httpStatus.OK).send({
      bookingId: booking.id,
    });
  } catch (error) {
    if (error.name === "CannotBookingError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

