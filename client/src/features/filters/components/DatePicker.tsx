import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState } from "react";

export default function DatePicker({ setDate }) {
  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };
  return (
    <div className="datepicker-container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar views={["day"]} onChange={handleDateChange} />
      </LocalizationProvider>
    </div>
  );
}
