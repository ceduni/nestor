import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useEffect, useState } from "react";
export default function DayCalendar({
  availableDays,
  day,
  setDay,
  setShowDayCalendar,
}) {
  const [value, setValue] = React.useState(dayjs(day));

  useEffect(() => {
    setShowDayCalendar(false);
    setDay(value.toDate());
  }, [value]);

  const handleDisabledDates = (date) => {
    return !availableDays.includes(date.toDate().toISOString().split("T")[0]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem>
        <DateCalendar
          views={["day"]}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          shouldDisableDate={(date) => handleDisabledDates(date)}
        />
      </DemoItem>
    </LocalizationProvider>
  );
}
