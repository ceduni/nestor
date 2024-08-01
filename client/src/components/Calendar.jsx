import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootStrapPlugin from "@fullcalendar/bootstrap";
import frLocale from "@fullcalendar/core/locales/fr";
import { fr } from "date-fns/locale/fr";
import React, { useEffect, useRef, useState } from "react";
import { addMinutes, format, getDay, getMonth } from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
import Modal from "./Modal";

export default function Calendar({ spaceDetail }) {
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);
  const [dateRange, setDateRange] = useState(null);
  const locale = fr;
  const [allReservations, setAllReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [event, setEvent] = useState({
    start: new Date(),
    end: addMinutes(new Date(), 30),
  });

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

  useEffect(() => {
    handleAvailabilities();
  }, [spaceDetail, allReservations]);

  const handleAvailabilities = () => {
    const allEvents = [];
    let index = 0;
    allReservations.forEach((reservation) => {
      if (
        reservation.spaceId === spaceDetail._id &&
        reservation.status === "confirmed"
      ) {
        allEvents.push({
          start: new Date(reservation.availability.startAt),
          end: new Date(reservation.availability.endAt),
          extendedProps: {
            isBooked: true,
          },
          overlap: false,
          borderColor: "#df9294",
          textColor: "#000",
          editable: false,
          backgroundColor: "#df9294",
          id: index,
        });
        index += 1;
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
            extendedProps: {
              isBooked: false,
            },
            overlap: true,
            borderColor: "#84e987",
            textColor: "#000",
            backgroundColor: "#84e987",
            editable: true,
            id: index,
          });
          index += 1;
        }
        currentTime = addMinutes(currentTime, 30);
      }
    });
    allEvents.sort((a, b) => a.start.getTime() - b.start.getTime());
    let pos = 0;
    while (pos < allEvents.length - 1) {
      if (getDay(allEvents[pos].end) !== getDay(allEvents[pos + 1].start)) {
        allEvents.splice(pos, 0, {
          start: allEvents[pos].end,
          end: addMinutes(allEvents[pos].end, 30),
          overlap: false,
          backgroundColor: "#FFF",
          borderColor: "#FFF",
          textColor: "#FFF",
        });
        pos += 1;
      }
      pos += 1;
    }
    allEvents.push({
      start: allEvents[pos].end,
      end: addMinutes(allEvents[pos].end, 30),
      overlap: false,
      backgroundColor: "#FFF",
      borderColor: "#FFF",
      textColor: "#FFF",
    });
    setEvents(allEvents);
  };

  const displayDate = (start, end) => {
    let concatFormat = "dd";
    if (getMonth(start) !== getMonth(end)) {
      concatFormat = "MMMM dd";
    }
    setDateRange(
      format(start, "MMMM dd", { locale })
        .concat(" - ")
        .concat(format(end, concatFormat, { locale })),
    );
  };

  const handleTodayClick = () => {
    const calendarAPI = calendarRef?.current?.getApi();
    calendarAPI?.today();
  };

  const handleNextClick = () => {
    const calendarAPI = calendarRef?.current?.getApi();
    calendarAPI?.next();
  };

  const handleBackClick = () => {
    const calendarAPI = calendarRef?.current?.getApi();
    calendarAPI?.prev();
  };

  const handleResize = (e) => {
    if (
      typeof e.extendedProps.isBooked !== undefined &&
      !e.extendedProps.isBooked
    ) {
      e.setProp("borderColor", "#06940a");
      e.setProp("textColor", "#FFF");
      e.setProp("backgroundColor", "#06940a");
    } else if (
      typeof e.extendedProps.isBooked !== undefined &&
      e.extendedProps.isBooked
    ) {
      e.setProp("borderColor", "#f1090d");
      e.setProp("textColor", "#FFF");
      e.setProp("backgroundColor", "#f1090d");
    }
    const calendarAPI = calendarRef?.current?.getApi();
    const events = calendarAPI?.getEvents();
    const indexToUpdate = events.findIndex((event) => e.id === event.id);
    for (let i = 0; i < events.length; i++) {
      if (
        i !== indexToUpdate &&
        events[i].end.getTime() <= e.end.getTime() &&
        events[i].start.getTime() >= e.start.getTime()
      ) {
        console.log(e);
        console.log(event);
        events[i].setProp("display", "none");
      }
      if (i !== indexToUpdate && events[i].start.getTime() >= e.end.getTime()) {
        events[i].setProp("display", "");
      }
    }
    setEvent(e);
    setShowModal(true);
  };

  const handlePopOverContent = (event) => {
    return "";
  };

  const handleEventClick = (e) => {
    if (
      typeof e.extendedProps.isBooked !== undefined &&
      e.extendedProps.isBooked
    ) {
      e.setProp("backgroundColor", "#f1090d");
      e.setProp("textColor", "#FFF");
      e.setProp("borderColor", "#f1090d");
    } else if (
      typeof e.extendedProps.isBooked !== undefined &&
      !e.extendedProps.isBooked
    ) {
      e.setProp("backgroundColor", "#06940a");
      e.setProp("textColor", "#FFF");
      e.setProp("borderColor", "#06940a");
    }
    setEvent(e);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <div className="flex justify-between">
          <div className="flex bg-[#ebedee] text-lg ">
            <div className="px-4 hover:bg-[#d4d5d6]" onClick={handleBackClick}>
              Retour
            </div>
            <div className="px-4 hover:bg-[#d4d5d6]" onClick={handleTodayClick}>
              Aujourd'hui
            </div>
            <div className="px-4 hover:bg-[#d4d5d6] " onClick={handleNextClick}>
              Prochain
            </div>
          </div>
          <div className="bg-[#ebedee] px-2">{dateRange}</div>
        </div>
        <FullCalendar
          locale={frLocale}
          ref={calendarRef}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            bootStrapPlugin,
          ]}
          initialView="timeGridWeek"
          headerToolbar={false}
          allDaySlot={false}
          events={events}
          datesSet={(dateInfo) => {
            displayDate(dateInfo.start, dateInfo.end);
          }}
          eventResize={(info) => handleResize(info.event)}
          eventClick={(info) => handleEventClick(info.event)}
          eventDidMount={(info) => {
            return new bootstrap.Popover(info.el, {
              title: info.event.title,
              placement: "auto",
              trigger: "click",
              customClass: "popoverStyle",
              content: handlePopOverContent(info.event),
              html: true,
              sanitize: false,
            });
          }}
        />
      </div>
      {showModal && (
        <Modal events={events} event={event} setShowModal={setShowModal} />
      )}
    </div>
  );
}
