import React from "react";
import { format } from "date-fns";

export default function ReservationInfo({ eventSelected }) {
  console.log(eventSelected);
  const { title, start, end } = eventSelected;
  const startDateFormatted = format(new Date(start), "dd-MM-yyyy HH:mm");
  const endDateFormatted = format(new Date(end), "dd-MM-yyyy HH:mm");
  return (
    <div className="flex flex-col w-full gap-y-3">
      <div className="flex flex-col gap-2 justify-start items-start p-2">
        <p>Activité : {title}</p>
        <p>Heure de début : {startDateFormatted}</p>
        <p>Heure de fin : {endDateFormatted}</p>
        <div className="flex items-center gap-3">
          <button className="bg-red-200 p-1 rounded">annuler</button>
        </div>
      </div>
      <div className="flex items-center justify-center w-full p-2">
        <div className="w-1/2">
          <h3>Participants</h3>
          <ul>
            <li>utilisateur 1</li>
            <li>utilisateur 2</li>
            <li>utilisateur 3</li>
          </ul>
        </div>
        <div className="w-1/2">
          <h3>Demandes de participation</h3>
          <ul>
            <li className="flex justify-between items-center gap-y-2">
              <p>utilisateur 1</p>
              <div className="flex justify-between gap-x-2">
                <button className="bg-green-200 px-2 py-1">O</button>
                <button className="bg-red-200 px-2 py-1">X</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
