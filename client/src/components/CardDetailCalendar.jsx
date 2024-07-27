import React, { useCallback, useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { frCA } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import ReservationInfo from "./ReservationInfo";
import {
  addDays,
  addMinutes,
  addMonths,
  addWeeks,
  endOfWeek,
  format,
  getDay,
  getMonth,
  parse,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
  addHours,
} from "date-fns";
import { all } from "axios";

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
  const [events, setEvents] = useState([]);
  const [isEventSelected, setIsEventSelected] = useState(false);
  const [view, setView] = useState(Views.WEEK);
  const currentDate = new Date();
  const [date, setDate] = useState(currentDate);
  const onView = useCallback((newDate) => setDate(newDate), [setDate]);
  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate]);
  const DndCalendar = withDragAndDrop(Calendar);
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

  const [allReservations, setAllReservations] = useState([]);

  useEffect(() => {
    fetchAllReservations();
  }, []);

  const fetchAllReservations = () => {
    fetch("http://localhost:3000/api/v1/reservations/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAllReservations(data);
      })
      .catch((err) => console.error(err));
  };

  const customEvent = ({ event }) => {
    return (
      <div className={`w-full h-full text-xs p-2 text-white`}>
        {`${format(event.start, "p").split(" ")[0]} à ${format(event.end, "p")}`}
      </div>
    );
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

  useEffect(() => {
    const allEvents = [];
    allReservations.forEach((reservation) => {
      if (
        reservation.spaceId === spaceDetail._id &&
        reservation.status === "confirmed"
      ) {
        allEvents.push({
          start: new Date(reservation.availability.startAt),
          end: new Date(reservation.availability.endAt),
          isClicked: false,
          isVisible: true,
          isBooked: true,
          isDraggable: false,
        });
      }
    });
    spaceDetail.availabilities.forEach((avail) => {
      let currentTime = new Date(avail.startAt);
      const endTime = new Date(avail.endAt);
      while (currentTime.getTime() < endTime.getTime()) {
        const tempStart = currentTime;
        const tempEnd = addMinutes(currentTime, 30);
        const alreadyBooked = allEvents.findIndex(
          (event) =>
            tempStart.getTime() >= event.start.getTime() &&
            tempEnd.getTime() <= event.end.getTime(),
        );
        if (alreadyBooked === -1) {
          allEvents.push({
            start: currentTime,
            end: addMinutes(currentTime, 30),
            isClicked: false,
            isVisible: true,
            isBooked: false,
            isDraggable: true,
          });
        }
        currentTime = addMinutes(currentTime, 30);
      }
    });
    setEvents(allEvents);
  }, [spaceDetail, allReservations]);

  useEffect(() => {
    console.log(events);
  }, [events]);

  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      ...((isSelected || event.isClicked) && {
        style: {
          backgroundColor: "#06940a",
        },
      }),
      ...(!event.isVisible && {
        style: {
          display: "none",
        },
      }),
      ...(event.isBooked && {
        style: {
          backgroundColor: "#f76b6e",
        },
      }),
      ...(isSelected &&
        event.isBooked && {
          style: {
            backgroundColor: "#f1090d",
          },
        }),
      /*...(event.isLast && {
          style: {
            backgroundColor: '#f76b6e',
            borderBottomRightRadius: '8px',
            borderBottomLeftRadius: '8px',
          },
        }),
        ...(event.isFirst && {
          style: {
            backgroundColor: '#f76b6e',
            borderTopRightRadius: '8px',
            borderTopLeftRadius: '8px',
          },
        }),*/
    }),
    [],
  );

  const handleEventResize = useCallback(
    ({ event, start, end }) => {
      const tempEvents = events;
      const indexToUpdate = tempEvents.findIndex(
        (e) =>
          e.start.getTime() === event.start.getTime() &&
          e.end.getTime() === event.end.getTime(),
      );
      tempEvents[indexToUpdate].end = end;
      tempEvents[indexToUpdate].isClicked = true;
      for (let i = 0; i < tempEvents.length; i++) {
        if (
          i !== indexToUpdate &&
          tempEvents[i].end.getTime() <=
            tempEvents[indexToUpdate].end.getTime() &&
          tempEvents[i].start.getTime() >=
            tempEvents[indexToUpdate].start.getTime()
        ) {
          tempEvents[i].isVisible = false;
        }
        /*if(i !== indexToUpdate && tempEvents[i].start.getTime() === tempEvents[indexToUpdate].end.getTime()) {
        tempEvents[i].isDraggable = false
      }*/
        if (
          i !== indexToUpdate &&
          tempEvents[i].start.getTime() >=
            tempEvents[indexToUpdate].end.getTime()
        ) {
          tempEvents[i].isVisible = true;
        }
      }
      setEvents(tempEvents);
    },
    [events],
  );

  return (
    <div>
      <div className="py-5 flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex bg-[#ebedee] text-lg ">
            <div
              className="px-4 hover:bg-[#d4d5d6]"
              onClick={() => setDate(currentDate)}
            >
              Today
            </div>
            <div className="px-4 hover:bg-[#d4d5d6]" onClick={handleBackClick}>
              Back
            </div>
            <div className="px-4 hover:bg-[#d4d5d6] " onClick={handleNextClick}>
              Next
            </div>
          </div>
          <div className="bg-[#ebedee] px-2">{displayDate()}</div>
          <div className="flex bg-[#ebedee] text-lg ">
            <div
              className="px-4 hover:bg-[#d4d5d6] "
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
              className="px-4 hover:bg-[#d4d5d6] "
              onClick={() => {
                setView(Views.DAY);
              }}
            >
              Day
            </div>
          </div>
        </div>
        <DndCalendar
          localizer={localizer}
          events={events}
          eventPropGetter={eventPropGetter}
          components={{ event: customEvent }}
          style={{ height: 500 }}
          defaultView="week"
          toolbar={false}
          tooltipAccessor={"test"}
          view={view}
          onView={onView}
          onNavigate={onNavigate}
          onEventResize={handleEventResize}
          draggableAccessor={(event) => event.isDraggable}
          date={date}
        />
      </div>

      {isEventSelected && <ReservationInfo eventSelected={eventSelected} />}
    </div>
  );
}
