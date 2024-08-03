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
import ConfirmationAlert from "./ConfirmationAlert.jsx";
import { io } from "socket.io-client";

export default function Calendar({ spaceDetail }) {
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);
  const [dateRange, setDateRange] = useState(null);
  const locale = fr;
  const [allReservations, setAllReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [event, setEvent] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  //const socket = io('http://localhost:3000')

  useEffect(() => {
    /*socket.on("newReservation", (newReservation) => {
      console.log("test")
      setAllReservations([...allReservations, newReservation])
    })*/
    fetchAllReservations();
    return () => {
      /*socket.off('newReservation', (newReservation) => {
        setAllReservations([...allReservations, newReservation])
      });*/
    };
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
        (reservation.status === "confirmed" || reservation.status === "pending")
      ) {
        allEvents.push({
          start: new Date(reservation.availability.startAt),
          end: new Date(reservation.availability.endAt),
          extendedProps: {
            isBooked: true,
            spaceId: spaceDetail._id,
            availId: reservation.availability._id,
          },
          overlap: false,
          borderColor: "#df9294",
          textColor: "#000",
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
              spaceId: spaceDetail._id,
              availId: avail._id,
            },
            overlap: true,
            borderColor: "#84e987",
            textColor: "#000",
            backgroundColor: "#84e987",
            id: index,
          });
          index += 1;
        }
        currentTime = addMinutes(currentTime, 30);
      }
    });
    allEvents.sort((a, b) => a.start.getTime() - b.start.getTime());
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

  const handlePopOverContent = (event) => {
    return "";
  };

  const handleEventClick = (e) => {
    /*if (e.extendedProps.isBooked
    ) {
      e.setProp("backgroundColor", "#f1090d");
      e.setProp("textColor", "#FFF");
      e.setProp("borderColor", "#f1090d");
    }*/ if (!e.extendedProps.isBooked) {
      e.setProp("backgroundColor", "#06940a");
      e.setProp("textColor", "#FFF");
      e.setProp("borderColor", "#06940a");
      setEvent((prevEvent) => {
        if (Object.keys(prevEvent).length !== 0) {
          /*if(prevEvent.extendedProps.isBooked) {
            prevEvent.setProp("backgroundColor", "#df9294");
            prevEvent.setProp("textColor", "#000");
            prevEvent.setProp("borderColor", "#df9294");
          }*/
          if (!prevEvent.extendedProps.isBooked) {
            prevEvent.setProp("backgroundColor", "#84e987");
            prevEvent.setProp("textColor", "#000");
            prevEvent.setProp("borderColor", "#84e987");
          }
        }
        return e;
      });
      setShowModal(true);
    }
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
        <Modal
          events={events}
          event={event}
          setShowModal={setShowModal}
          setShowConfirmation={setShowConfirmation}
        />
      )}
      {showConfirmation && (
        <ConfirmationAlert setShowConfirmation={setShowConfirmation} />
      )}
    </div>
  );
}
