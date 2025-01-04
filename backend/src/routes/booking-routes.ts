import express from "express";
import {
  createBooking,
  deleteBooking,
  getAvailability,
  getBookings,
} from "../controllers/booking-controller";
export const bookingRouter = express.Router();

// get bookings route
bookingRouter.get("/bookings", getBookings);
// get available dates
bookingRouter.post("/getAvailability", getAvailability);
// create booking route
bookingRouter.post("/createBooking", createBooking);
// delete booking route
bookingRouter.delete("/deleteBooking/:id", deleteBooking)
