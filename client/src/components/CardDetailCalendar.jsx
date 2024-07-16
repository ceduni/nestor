import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { frCA } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReservationInfo from './ReservationInfo';
import { useQuery } from '@tanstack/react-query';

import { getReservations, getReservationById, createReservation, updateReservation, deleteReservation } from '../apis/reservation-api';

const locales = {
  "en-US": frCA,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CardDetailCalendar({spaceDetail}) {
  // const {data:allReservations, error, isLoading} = useQuery({
  //   queryKey : ['reservations'], 
  //   queryFn : getReservations,
  // });
  
  // const {data:allReservations = [], error, isLoading} = useQuery({
  //   queryKey : ['reservations'], 
  //   queryFn : async ()=>{
  //     const response = await fetch("http://localhost:3000/api/v1/reservations/");
  //     const data = await response.json();
  //     return data;
  //   },
  //   initialData: [],
  // });

  // console.log(allReservations);

  const [isEventSelected, setIsEventSelected] = useState(false);
  const [eventSelected, setEventSelected] = useState({
    title: "",
    start: "",
    end: "",
  });
  const [reservation, setReservation] = useState({
    hostId: "",
    isPeriodic: false,
    startAt: "",
    endAt: "",
    guestIds: [],
    activity: "",
    status: "",
    isPrivate: false,
    spaceId: spaceDetail._id,
  });

  const [allReservations, setAllReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getReservations();
        setReservations(data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleStartAtChange = (e) => {
    const startDateTime = e.target.value;
    setReservation({ ...reservation, startAt: startDateTime });
  };
  const handleEndAtChange = (e) => {
    const endDateTime = e.target.value;
    setReservation({ ...reservation, endAt: endDateTime });
  };
  const handleActiviteChange = (e) => {
    const activity = e.target.value;
    setReservation({ ...reservation, activity: activity });
  };
  const handleStatutChange = (e) => {
    const statut = e.target.value;
    setReservation({ ...reservation, status: statut });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(reservation);
    const { activity, startAt, endAt } = reservation;
    const event = {
      title: activity,
      start: new Date(startAt),
      end: new Date(endAt),
    };
    const isBeforeNow = isDateBeforeNow(event.start, event.end);
    const hasDuplicate = allReservations.some((reservation) => {
      return isDateInInterval(
        event.start,
        event.end,
        reservation.start,
        reservation.end,
      );
    });

    if (isBeforeNow) {
      console.log("Impossible");
      alert("Impossible");
      // display msg
      return;
    }

    if (hasDuplicate) {
      console.log("Already exists");
      alert("Already exists");
      // display msg
      return;
    } else {
      // add post request
      setAllReservations((prevAllReservations) => [
        ...prevAllReservations,
        event,
      ]);
    }
  };

  const handleSelectEvent = (e) => {
    // e.preventDefault();
    console.log("Selected event : " + e.title);

    if (isEventSelected && eventSelected.title === e.title) {
      setIsEventSelected(false);
      setEventSelected({ title: "", start: "", end: "" });
    } else {
      setIsEventSelected(true);
      setEventSelected({
        title: e.title,
        start: e.start.toString(),
        end: e.end.toString(),
      });
    }
    console.log(eventSelected);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex gap-x-7 justify-center items-center py-5"
      >
        <div className="flex flex-col">
          <div className="flex flex-col gap-2 p-2">
            <label className="font-semibold" htmlFor="start_time">
              Date et heure de début
            </label>
            <input
              onChange={handleStartAtChange}
              id="start_time"
              className="card_detail_input border w-44 p-2"
              type="datetime-local"
            />
          </div>
          <div className="flex flex-col gap-2 p-2">
            <label className="font-semibold" htmlFor="end_time">
              Date et heure de fin
            </label>
            <input
              onChange={handleEndAtChange}
              id="end_time"
              className="card_detail_input border w-44 p-2"
              type="datetime-local"
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='flex flex-col gap-2 p-2'>
              <label className='font-semibold' htmlFor="activite">Activité</label>
              <input onChange={handleActiviteChange} id='activite' type="text" className='card_detail_input border w-44 p-2' />
          </div>
          <div className='flex flex-col gap-2 p-2'>
              <label className='font-semibold' htmlFor="activite">Statut</label>
              <select onChange={handleStatutChange} name="status" id="status">
                <option value="fullfilled">fullfilled</option>
                <option value="confirmed">confirmed</option>
                <option value="pending">pending</option>
                <option value="cancelled">cancelled</option>
              </select>
          </div>
        </div>
        <button className="border p-2 rounded-full font-semibold" type="submit">
          Réserver
        </button>
      </form>

      <div className="py-5">
        <Calendar
          localizer={localizer}
          events={allReservations}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          defaultView="week"
          views={{ month: true, week: true, day: true }}
          onSelectEvent={handleSelectEvent}
        />
      </div>

      {isEventSelected && <ReservationInfo eventSelected={eventSelected} />}
    </div>
  );
}

function isDateInInterval(targetStartDate, targetEndDate, startDate, endDate) {
  const targetStart = new Date(targetStartDate);
  const targetEnd = new Date(targetEndDate);
  const start = new Date(startDate);
  const end = new Date(endDate);

  return (
    (start <= targetStart && targetStart <= end) ||
    (start <= targetEnd && targetEnd <= end)
  );
}

function isDateBeforeNow(targetStartDate, targetEndDate) {
  const now = new Date();
  const start = new Date(targetStartDate);
  const end = new Date(targetEndDate);

  return start < now || end < now;
}
