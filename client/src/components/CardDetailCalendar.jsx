import React, { useCallback, useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { frCA } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
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
  const [selectedEvent, setSelectedEvent] = useState(undefined)
  const [modalState, setModalState] = useState(false)



  const onView = useCallback((newDate) => setDate(newDate), [setDate]);
  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate]);
  const DndCalendar = withDragAndDrop(Calendar);


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



  const handleSelectEvent = (e) => {
    setSelectedEvent(e);
    setModalState(true);
  }

  const Modal = () => {
    return (
        <div className={`modal-${modalState === true ? 'show' : 'hide'}`}>
          // Here you define your modal, what you want it to contain.
          // Event title for example will be accessible via 'selectedEvent.title'
        </div>
    )
  }

  useEffect(() => {
    const allEvents = [];
    let index = 0
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
          id: index
        });
        index += 1
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
            id: index
          });
          index += 1
        }
        currentTime = addMinutes(currentTime, 30);
      }
    });
    setEvents(allEvents);
  }, [spaceDetail, allReservations]);

  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      ...((isSelected || event.isClicked) && {
        style: {
          backgroundColor: "#06940a",
        },
      }),
      ...({
        className : event.id.toString()
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
        {selectedEvent && <Modal />}
        <DndCalendar
          localizer={localizer}
          events={events}
          eventPropGetter={eventPropGetter}
          //components={{ event: customEvent }}
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
          //onSelectSlot={(e) => handleSelect(e)}
          //onSelectEvent={(e) => handleSelectEvent(e)}
        />
      </div>
    </div>
  );
}
