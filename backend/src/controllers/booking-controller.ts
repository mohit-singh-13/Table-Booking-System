import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const getBookings = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();

  try {
    const data = await prisma.booking.findMany();

    res.status(200).json({ success: true, bookings: data });
    return;
  } catch (err) {
    res
      .status(409)
      .json({ success: false, message: "Couldn't fetch bookings" });
    return;
  } finally {
    await prisma.$disconnect();
  }
};

export const getAvailability = async (req: Request, res: Response) => {
  const { date }: { date: string } = req.body;

  const prisma = new PrismaClient();

  try {
    const result = await prisma.booking.findMany({
      where: { dateTime: { contains: date } },
    });

    const responseObj: { [key: string]: number } = {
      "10am": 0,
      "11am": 0,
      "12pm": 0,
      "1pm": 0,
      "2pm": 0,
      "3pm": 0,
      "4pm": 0,
    };

    if (result.length === 0) {
      res.status(200).json({
        success: true,
        timeSlots: responseObj,
      });
      return;
    } else {
      result.forEach((record) => {
        const t = record.dateTime.split(", ")[1];
        if (t === "10:00:00 AM") {
          responseObj["10am"]++;
        } else if (t === "11:00:00 AM") {
          responseObj["11am"]++;
        } else if (t === "12:00:00 PM") {
          responseObj["12pm"]++;
        } else if (t === "1:00:00 PM") {
          responseObj["1pm"]++;
        } else if (t === "2:00:00 PM") {
          responseObj["2pm"]++;
        } else if (t === "3:00:00 PM") {
          responseObj["3pm"]++;
        } else if (t === "4:00:00 PM") {
          responseObj["4pm"]++;
        }
      });

      res.status(200).json({ success: true, timeSlots: responseObj });
      return;
    }
  } catch (err) {
    res
      .status(409)
      .json({ success: false, message: "Couldn't fetch availability" });
    return;
  } finally {
    await prisma.$disconnect();
  }
};

interface CreateBookingProps {
  name: string;
  noOfGuests: string;
  phoneNumber: string;
  email: string;
  dateTime: string;
}

export const createBooking = async (req: Request, res: Response) => {
  const body: CreateBookingProps = req.body;

  const validateGuests = Number(body.noOfGuests);
  const validatePhoneNumber = Number(body.phoneNumber);

  if (Number.isNaN(validateGuests) || Number.isNaN(validatePhoneNumber)) {
    res.status(422).json({
      success: false,
      message: "No. of guests and phone number should be numeric",
    });
    return;
  }

  if (
    !body.name ||
    !body.noOfGuests ||
    !body.email ||
    !body.phoneNumber ||
    !body.dateTime
  ) {
    res
      .status(422)
      .json({ success: false, message: "All fields are required" });
    return;
  }

  const validateDateTime = body.dateTime.split(" ");
  if (validateDateTime.length <= 1) {
    res
      .status(422)
      .json({ success: false, message: "Date and Time are required" });
    return;
  }

  const prisma = new PrismaClient();

  try {
    const result = await prisma.booking.create({
      data: {
        name: body.name,
        noOfGuests: body.noOfGuests,
        phoneNumber: body.phoneNumber,
        email: body.email,
        dateTime: body.dateTime,
      },
    });

    res.status(200).json({
      success: true,
      message: "Booking has been created successfully",
      result,
    });
    return;
  } catch (err) {
    res
      .status(409)
      .json({ success: false, message: "Couldn't create booking" });
    return;
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  // const { id }: { id: number } = req.body;
  const { id } = req.params as { id: string };

  const tempId = Number(id);

  const prisma = new PrismaClient();

  try {
    await prisma.booking.delete({ where: { id: tempId } });

    res.status(200).json({
      success: true,
      message: "Booking has been deleted successfully",
    });
    return;
  } catch (err) {
    res
      .status(409)
      .json({ success: false, message: "Couldn't delete booking" });
    return;
  } finally {
    await prisma.$disconnect();
  }
};
