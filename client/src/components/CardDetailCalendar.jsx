import React, { useState, useEffect, useCallback } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  endOfWeek,
  getMonth,
  addMonths,
  addWeeks,
  addDays,
  subMonths,
  subWeeks,
  subDays,
  getHours,
} from "date-fns";
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
import { useReservations } from "../context/ReservationsContext";

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
  const [reservations, setReservations] = useState(
    allReservations.filter((r) => r.spaceId === spaceDetail.spaceId),
  );
  const [events, setEvents] = useState([]);
  const [isEventSelected, setIsEventSelected] = useState(false);
  const [view, setView] = useState(Views.WEEK);
  const currentDate = new Date();
  const [date, setDate] = useState(currentDate);
  const [eventSelected, setEventSelected] = useState({
    title: "",
    start: "",
    end: "",
  });
  const [reservation, setReservation] = useState({
    hostId: "613f3bda5f4378b64b448f20",
    availability:{
      isPeriodic: true,
      startAt: "2024-07-22T13:00:00.000Z",
      endAt: "2024-07-22T14:00:00.000Z",
      _id: "669c6aa9127704186ecb4588"
    },
    guestIds: [],
    activity: "",
    status: "fullfilled",
    isPrivate: false,
    spaceId: spaceDetail._id,
  });

  const onView = useCallback((newDate) => setDate(newDate), [setDate]);
  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate]);
  const displayDate = () => {
    if (view === Views.MONTH) return format(date, "MMMM yyyy");
    else if (view === Views.WEEK) {
      let concatFormat = "dd";
      if (getMonth(startOfWeek(date)) !== getMonth(endOfWeek(date))) {
        concatFormat = "MMMM dd";
      }
      return format(startOfWeek(date), "MMMM dd")
        .concat(" - ")
        .concat(format(endOfWeek(date), concatFormat));
    } else return format(date, "EEEE MMM dd");
  };

  const handleNextClick = () => {
    if (view === Views.MONTH) setDate(addMonths(date, 1));
    else if (view === Views.WEEK) setDate(addWeeks(date, 1));
    else setDate(addDays(date, 1));
  };

  const handleBackClick = () => {
    if (view === Views.MONTH) setDate(subMonths(date, 1));
    else if (view === Views.WEEK) setDate(subWeeks(date, 1));
    else setDate(subDays(date, 1));
  };
  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      ...(!isSelected && {
        style: {
          backgroundColor: "#88f488",
          border: "none",
        },
      }),
    }),
    [],
  );
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

  useEffect(() => {
    const allEvents = spaceDetail.availabilities.map((avail) => {
      let startTime = new Date(avail.startAt);
      let endTime = new Date(avail.endAt);
      if (avail.isPeriodic) {
        startTime = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          startTime.getHours(),
          startTime.getMinutes(),
          startTime.getSeconds(),
        );
        endTime = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          endTime.getHours(),
          endTime.getMinutes(),
          endTime.getSeconds(),
        );
      }
      const event = {
        title: "",
        start: startTime,
        end: endTime,
      };
      return event;
    });
    setEvents(allEvents);
  }, [spaceDetail]);

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setReservation((prev) => ({
      ...prev,
      [name]:value
    }))
  }

  const handleDatesChange = (e)=>{
    // const {name, value} = e.target;
    // const dateValue = new Date(value).toISOString();
    // setReservation(prev =>({
    //   ...prev,
    //   availability: {
    //     ...prev.availability,
    //     [name]:dateValue
    //   }
    // }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(reservation);
    const { activity, availability } = reservation;
    const event = {
      title: activity,
      start: new Date(availability.startAt),
      end: new Date(availability.endAt),
    };
    // const isBeforeNow = isDateBeforeNow(event.start, event.end);
    // const hasDuplicate = allReservations.some((reservation) => {
    //   return isDateInInterval(
    //     event.start,
    //     event.end,
    //     reservation.start,
    //     reservation.end,
    //   );
    // });


    postAddReservation(event);
    // date validations
    // if (isBeforeNow) {
    //   console.log("Impossible");
    //   alert("Impossible");
    //   // display msg
    //   return;
    // }
    // if (hasDuplicate) {
    //   console.log("Already exists");
    //   alert("Already exists");
    //   // display msg
    //   return;
    // } else {
    //   // add post request
    //   postAddReservation(event);

    //   // setEvents((prevAllReservations) => [
    //   //   ...prevAllReservations,
    //   //   event,
    //   // ]);
    // }
  };

  const postAddReservation = async (newEvent)=>{
    try{
      const res = await fetch(`http://localhost:3000/api/v1/reservations/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(reservation)
      })

      const result = await res.json();

      if(!res.ok){
        console.error('Error : ', result);
        throw new Error("Failed to add reservation");
      }

      setEvents((prevAllReservations) => [
        ...prevAllReservations,
        newEvent,
      ]);

      console.log('Add reservation successfully');
    } catch(err){
      console.log(error);
    }
  }

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
      {/*<form
        onSubmit={handleSubmit}
        className="flex gap-x-7 justify-center items-center py-5"
      >
        <div className="flex flex-col">
          <div className="flex flex-col gap-2 p-2">
            <label className="font-semibold" htmlFor="startAt">
              Date et heure de début
            </label>
            <input
              onChange={handleDatesChange}
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
              onChange={handleDatesChange}
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
      </form>*/}

      <div className="py-5 flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex bg-[#ebedee] font-bold text-lg rounded-xl">
            <div
              className="px-4 hover:bg-[#d4d5d6] rounded-l-xl"
              onClick={() => setDate(currentDate)}
            >
              Today
            </div>
            <div className="px-4 hover:bg-[#d4d5d6]" onClick={handleBackClick}>
              Back
            </div>
            <div
              className="px-4 hover:bg-[#d4d5d6] rounded-r-xl"
              onClick={handleNextClick}
            >
              Next
            </div>
          </div>
          <div className="bg-[#ebedee] font-bold rounded-xl px-2">
            {displayDate()}
          </div>
          <div className="flex bg-[#ebedee] font-bold text-lg rounded-xl">
            <div
              className="px-4 hover:bg-[#d4d5d6] rounded-l-xl"
              onClick={() => {
                setView(Views.MONTH);
              }}
            >
              Month
            </div>
            <div
              className="px-4 hover:bg-[#d4d5d6]"
              onClick={() => {
                setView(Views.WEEK);
              }}
            >
              Week
            </div>
            <div
              className="px-4 hover:bg-[#d4d5d6] rounded-r-xl"
              onClick={() => {
                setView(Views.DAY);
              }}
            >
              Day
            </div>
          </div>
        </div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          defaultView="week"
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventPropGetter}
          toolbar={false}
          view={view}
          onView={onView}
          onNavigate={onNavigate}
          date={date}
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
