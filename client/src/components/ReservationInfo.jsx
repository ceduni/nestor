import React from "react";
import { format } from "date-fns";

export default function ReservationInfo({ eventSelected }) {
  console.log(eventSelected);
  const { title, start, end } = eventSelected;
  const startDateFormatted = format(new Date(start), "dd-MM-yyyy HH:mm");
  const endDateFormatted = format(new Date(end), "dd-MM-yyyy HH:mm");
  return (
    <div>
      <p>{title}</p>
      <p>{startDateFormatted}</p>
      <p>{endDateFormatted}</p>
      <button>annuler</button>
    </div>
  );
}
