import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { frCA } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReservationInfo from "./ReservationInfo";
import { useQuery } from "@tanstack/react-query";

import {
  getReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
} from "../apis/reservation-api";
import { useReservations } from '../context/ReservationsContext';

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

export default function CardDetailCalendar({ spaceDetail }) {
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

  const {allReservations, setAllReservations, fetchAllReservations} = useReservations();
  const [reservations, setReservations] = useState(allReservations.filter(r => r.spaceId === spaceDetail.spaceId));
  const [events, setEvents] = useState([]);
  const [isEventSelected, setIsEventSelected] = useState(false);
  const [eventSelected, setEventSelected] = useState({
    title: "",
    start: undefined,
    end: undefined,
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

  // const filterReservationsBySpace = (spaceDetail) =>{
  //   const spaceReservations = allReservations.filter(r => r.spaceId === spaceDetail.id);
  //   return spaceReservations;
  // }

  // const [allReservations, setAllReservations] = useState([]);

  // useEffect(() => {
  //   const fetchReservations = async () => {
  //     try {
  //       const data = await getReservations();
  //       setReservations(data);
  //       setIsLoading(false);
  //     } catch (err) {
  //       setError(err);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchReservations();
  // }, []);

  useEffect(()=>{
    const spaceReservations = allReservations.filter(r => r.spaceId === spaceDetail._id);
    console.log(spaceReservations);
    const allEvents = spaceReservations.map(r => {
      const event = {
        title: r.activity,
        start: new Date(r.availability.startAt),
        end: new Date(r.availability.startAt)
      }
      return (event);
    })

    console.log(allEvents);
    setEvents(allEvents);
  }, [spaceDetail])

  const handleInputsChange = (e)=>{
    const {name, value} = e.target;
    setReservation(prev =>({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(spaceDetail);
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
        className="flex gap-x-7 justify-center items-center py-5"
      >
        <div className="flex flex-col">
          <div className="flex flex-col gap-2 p-2">
            <label className="font-semibold" htmlFor="startAt">
              Date et heure de début
            </label>
            <input
              onChange={handleInputsChange}
              id="startAt"
              name='startAt'
              className="card_detail_input border w-44 p-2"
              type="datetime-local"
            />
          </div>
          <div className="flex flex-col gap-2 p-2">
            <label className="font-semibold" htmlFor="endAt">
              Date et heure de fin
            </label>
            <input
              onChange={handleInputsChange}
              id="endAt"
              name='endAt'
              className="card_detail_input border w-44 p-2"
              type="datetime-local"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-2 p-2">
            <label className="font-semibold" htmlFor="activity">
              Activité
            </label>
            <input
              onChange={handleInputsChange}
              id="activity"
              name='activity'
              type="text"
              className="card_detail_input border w-44 p-2"
            />
          </div>
          <div className="flex flex-col gap-2 p-2">
            <label className="font-semibold" htmlFor="status">
              Statut
            </label>
            <select onChange={handleInputsChange} name="status" id="status">
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
          events={events}
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
