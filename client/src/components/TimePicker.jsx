import React, { useEffect, useState } from "react";
import { format } from "date-fns";

export default function TimePicker({ availTimes, setStart,  setShowTimeDrop}) {
  const handleTimeClick = (e) => {
    const selectedTime = e.target.textContent;
    availTimes.some((availTime) => {
      if (format(availTime, "HH:mm") === selectedTime) {
        setStart(availTime);
      }
      return format(availTime, "HH:mm") === selectedTime;
    });
      setShowTimeDrop(false);
  };

  return (
    <div className="flex flex-col gap-1 border-2 rounded-xl py-1">
      {availTimes.map((startTime, index) => (
        <div
          className="px-3 hover:font-bold"
          key={index}
          onClick={(e) => handleTimeClick(e)}
        >
          {format(startTime, "HH:mm")}
        </div>
      ))}
    </div>
  );
}
