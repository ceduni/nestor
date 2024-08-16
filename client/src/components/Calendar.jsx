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
import { createReservation, getReservations } from "../apis/reservation-api.js";

export default function Calendar({ spaceDetail }) {
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);
  const [dateRange, setDateRange] = useState(null);
  const locale = fr;
  const [allReservations, setAllReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [event, setEvent] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [socket, setSocket] = useState(null);
  const [expireTimes, setExpireTimes] = useState([]);
  const [pendingReservationId, setPendingReservationId] = useState("");
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    getReservations().then((reservations) => setAllReservations(reservations));
    const ws = new WebSocket("ws://localhost:3000/api/v1/reservations/new");
    setSocket(ws);
    ws.onmessage = async (event) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const data = JSON.parse(e.target.result);
        if (data.status === "pending" || data.status === "confirmed") {
          setAllReservations((prevReservations) => [...prevReservations, data]);
        } else if (data.status === "cancelled") {
          setAllReservations((prevReservations) =>
            prevReservations.filter(
              (reservation) => reservation._id !== data.pendingReservationId,
            ),
          );
        }
      };
      reader.readAsText(event.data);
    };
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const tempExpireTimes = [];
    allReservations.forEach((reservation) => {
      if (reservation.status === "pending") {
        tempExpireTimes.push(new Date(reservation.expireAt.toString()));
      }
    });
    setExpireTimes(tempExpireTimes);
  }, [allReservations]);

  useEffect(() => {
    expireTimes.forEach((expireTime) => {
      const currentDate = new Date();
      setTimeout(
        () =>
          getReservations().then((reservations) =>
            setAllReservations(reservations),
          ),
        expireTime.getTime() - currentDate.getTime(),
      );
    });
  }, [expireTimes]);

  useEffect(() => {
    handleAvailabilities();
  }, [spaceDetail, allReservations]);

  const handleAvailabilities = () => {
    const allEvents = [];
    let index = 0;
    allReservations.forEach((reservation) => {
      if (
        reservation.spaceId === spaceDetail._id &&
        (reservation.status === "pending" || reservation.status === "confirmed")
      ) {
        allEvents.push({
          start: new Date(reservation.availability.startAt),
          end: new Date(reservation.availability.endAt),
          extendedProps: {
            status: reservation.status,
            spaceId: spaceDetail._id,
            availId: reservation.availability._id,
            hostId: reservation.hostId,
          },
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
        const alreadyPending = allEvents.findIndex(
          (event) =>
            tempStart.getTime() >= event.start.getTime() &&
            tempEnd.getTime() <= event.end.getTime(),
        );
        if (alreadyPending === -1) {
          allEvents.push({
            start: currentTime,
            end: addMinutes(currentTime, 30),
            extendedProps: {
              spaceId: spaceDetail._id,
              availId: avail._id,
            },
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
      format(start, "MMMM dd", { locale }) +
        " - " +
        format(end, concatFormat, { locale }),
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
    if (event.extendedProps.status === "pending") {
      return `<div>en cours de réservation</div>`;
    }
    return "";
  };

  const handleEventClick = (e) => {
    /*if (e.extendedProps.status
    ) {
      e.setProp("backgroundColor", "#f1090d");
      e.setProp("textColor", "#FFF");
      e.setProp("borderColor", "#f1090d");
    }*/ if (!e.extendedProps.status) {
      e.setProp("backgroundColor", "#06940a");
      e.setProp("textColor", "#FFF");
      e.setProp("borderColor", "#06940a");
      setEvent((prevEvent) => {
        if (Object.keys(prevEvent).length !== 0) {
          /*if(prevEvent.extendedProps.status) {
            prevEvent.setProp("backgroundColor", "#df9294");
            prevEvent.setProp("textColor", "#000");
            prevEvent.setProp("borderColor", "#df9294");
          }*/
          if (!prevEvent.extendedProps.status) {
            prevEvent.setProp("backgroundColor", "#84e987");
            prevEvent.setProp("textColor", "#000");
            prevEvent.setProp("borderColor", "#84e987");
          }
        }
        return e;
      });
      setShowModal(true);
      let minStartTime = Number.MAX_VALUE;
      let maxEndTime = 0;
      events.forEach((event) => {
        if (
          event.start.toISOString().split("T")[0] ===
            e.start.toISOString().split("T")[0] &&
          !event.extendedProps.status
        ) {
          minStartTime = Math.min(minStartTime, event.start.getTime());
          maxEndTime = Math.max(maxEndTime, event.end.getTime());
        }
      });
      const lockedAvail = {
        hostId: userId,
        availability: {
          startAt: new Date(minStartTime),
          endAt: new Date(maxEndTime),
          _id: e.extendedProps.availId,
        },
        spaceId: e.extendedProps.spaceId,
        status: "pending",
        guestIds: [],
        isPrivate: true,
        activity: " ",
        expireAt: new Date(Date.now() + 10 * 1000),
      };
      createReservation(lockedAvail).then((lockedAvail) => {
        setPendingReservationId(lockedAvail._id);
        socket.send(JSON.stringify(lockedAvail));
      });
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
              trigger: "hover",
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
          socket={socket}
          setAllReservations={setAllReservations}
          pendingReservationId={pendingReservationId}
        />
      )}
      {showConfirmation && (
        <ConfirmationAlert setShowConfirmation={setShowConfirmation} />
      )}
    </div>
  );
}
