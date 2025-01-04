"use client";

import { ChangeEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "./Button";
import { AppContext, TimeSlotsProps } from "@/context/AppContext";
import jsPDF from "jspdf";
import { BookingsProps } from "./ListBookings";

interface FormProps {
  name: string;
  noOfGuests: string;
  phoneNumber: string;
  email: string;
  dateTime: string;
}

const Form = () => {
  const { selectedTime, selectedDate, setTime, setSelectedTimeFn } =
    useContext(AppContext);

  let dateTime = selectedDate;
  switch (selectedTime) {
    case "10am":
      dateTime += ", 10:00:00 AM";
      break;
    case "11am":
      dateTime += ", 11:00:00 AM";
      break;
    case "12pm":
      dateTime += ", 12:00:00 PM";
      break;
    case "1pm":
      dateTime += ", 1:00:00 PM";
      break;
    case "2pm":
      dateTime += ", 2:00:00 PM";
      break;
    case "3pm":
      dateTime += ", 3:00:00 PM";
      break;
    case "4pm":
      dateTime += ", 4:00:00 PM";
      break;
  }

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      dateTime: dateTime,
    }));
  }, [dateTime]);

  const [form, setForm] = useState<FormProps>({
    name: "",
    noOfGuests: "",
    phoneNumber: "",
    email: "",
    dateTime: "",
  });

  const generatePDF = ({
    name,
    email,
    phoneNumber,
    noOfGuests,
    dateTime,
  }: BookingsProps) => {
    const doc = new jsPDF();
    doc.setFontSize(25);
    doc.text("Booking Confimation", 60, 20);

    doc.line(30, 30, 185, 30);
    doc.setFontSize(18);
    doc.text(`Name: ${name}`, 60, 50);
    doc.text(`Email: ${email}`, 60, 60);
    doc.text(`Phone: ${phoneNumber}`, 60, 70);
    doc.text(`No. of Travelers: ${noOfGuests}`, 60, 80);
    doc.text(`Date of Tour: ${new Date(dateTime).toDateString()}`, 60, 90);

    doc.save("invoice.pdf");
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const clickHandler = async () => {
    const URL = process.env.NEXT_PUBLIC_BE_URL;

    try {
      const response: {
        data: { success: boolean; message: string; result: BookingsProps };
      } = await axios.post(`${URL}/api/v1/createBooking`, form);

      toast.success(response.data.message);
      setForm({
        name: "",
        noOfGuests: "",
        phoneNumber: "",
        email: "",
        dateTime: "",
      });

      generatePDF(response.data.result);

      try {
        const date = selectedDate.split(", ")[0];

        const response: {
          data: { success: boolean; timeSlots: TimeSlotsProps };
        } = await axios.post(`${URL}/api/v1/getAvailability`, { date });

        setTime(response.data.timeSlots);
        setSelectedTimeFn("");
      } catch (err: any) {
        toast.error(err.response.data.message);
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col gap-5 border rounded-md px-8 py-10 bg-white">
      <LabelledInput
        id="name"
        label="Name"
        type="text"
        name="name"
        value={form.name}
        onChange={changeHandler}
      />
      <LabelledInput
        id="noOfGuests"
        label="Number of Guests"
        type="text"
        name="noOfGuests"
        value={form.noOfGuests}
        onChange={changeHandler}
      />
      <LabelledInput
        id="email"
        label="Email"
        type="text"
        name="email"
        value={form.email}
        onChange={changeHandler}
      />
      <LabelledInput
        id="phoneNumber"
        label="Phone Number"
        type="text"
        name="phoneNumber"
        value={form.phoneNumber}
        onChange={changeHandler}
      />

      <Button
        className="text-white bg-black px-4 py-3 self-start rounded-lg"
        onClick={() => clickHandler()}
      >
        Book Now
      </Button>
    </div>
  );
};

interface LabelledInputProps {
  type: string;
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabelledInput = ({
  id,
  label,
  type,
  name,
  value,
  onChange,
}: LabelledInputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="rounded-lg py-3 px-2 border-gray-300 border-2 focus:border-blue-600 outline-none"
      />
    </div>
  );
};

export default Form;
