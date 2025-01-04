"use client";

import { AppContext, TimeSlotsProps } from "@/context/AppContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import toast from "react-hot-toast";

const Calendar = () => {
  const [selected, setSelected] = useState<Date>();

  const { toggleAvailability, setTime, setSelectedDateFn } =
    useContext(AppContext);

  const fetchDates = async (selected: Date | undefined) => {
    if (selected === undefined) return;

    toggleAvailability(true);

    const date = selected.toLocaleString().split(", ")[0];
    const URL = process.env.NEXT_PUBLIC_BE_URL;
    try {
      const response: {
        data: { success: boolean; timeSlots: TimeSlotsProps };
      } = await axios.post(`${URL}/api/v1/getAvailability`, { date });

      setTime(response.data.timeSlots);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }

    toggleAvailability(false);
  };

  useEffect(() => {
    fetchDates(selected);
    setSelectedDateFn(selected?.toLocaleDateString() || "");
  }, [selected]);

  return (
    <div className="w-[80%] mx-auto">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        footer={
          selected
            ? `Selected: ${selected.toLocaleDateString()}`
            : "Pick a day."
        }
        disabled={{ before: new Date() }}
        className="place-self-center"
      />
    </div>
  );
};

export default Calendar;
