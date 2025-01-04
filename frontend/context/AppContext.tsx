"use client";

import { createContext, useState } from "react";
import React from "react";

export interface TimeSlotsProps {
  "10am": number;
  "11am": number;
  "12pm": number;
  "1pm": number;
  "2pm": number;
  "3pm": number;
  "4pm": number;
}

interface AppContextType {
  availability: boolean;
  toggleAvailability: (flag: boolean) => void;
  timeSlots: TimeSlotsProps | null;
  setTime: (timeSlots: TimeSlotsProps) => void;
  selectedTime: string;
  setSelectedTimeFn: (time: string) => void;
  selectedDate: string;
  setSelectedDateFn: (date: string) => void;
}

export const AppContext = createContext<AppContextType>({
  availability: false,
  toggleAvailability: () => {},
  timeSlots: null,
  setTime: () => {},
  selectedTime: "",
  setSelectedTimeFn: () => {},
  selectedDate: "",
  setSelectedDateFn: () => {},
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [availability, setAvailability] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlotsProps | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const toggleAvailability = (flag: boolean) => {
    setAvailability(flag);
  };

  const setTime = (timeSlots: TimeSlotsProps) => {
    setTimeSlots(timeSlots);
  };

  const setSelectedTimeFn = (time: string) => {
    setSelectedTime(time);
  };

  const setSelectedDateFn = (date: string) => {
    setSelectedDate(date);
  };

  const value = {
    availability,
    toggleAvailability,
    timeSlots,
    setTime,
    selectedTime,
    setSelectedTimeFn,
    selectedDate,
    setSelectedDateFn,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
