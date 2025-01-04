"use client";

import { useContext } from "react";
import TimeCard from "./TimeCard";
import { AppContext } from "@/context/AppContext";
import TimeSkeleton from "./TimeSkeleton";

const TimeComponent = () => {
  const { availability, timeSlots } = useContext(AppContext);

  if (availability) {
    return <TimeSkeleton />;
  }

  if (timeSlots === null) return;

  return (
    <div className="w-full h-full border rounded-md bg-white">
      <div className="flex gap-5 flex-wrap px-4 py-8 justify-center">
        {Object.entries(timeSlots).map((ts, index) => (
          <TimeCard key={index} time={ts} />
        ))}
      </div>
    </div>
  );
};

export default TimeComponent;
