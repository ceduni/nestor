import { addMinutes, format } from "date-fns";
import { IoCalendarClearOutline } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import { IoPeople } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import DayCalendar from "./DayCalendar";
import TimePicker from "./TimePicker.jsx";
import { MdCancel } from "react-icons/md";
import {
  createReservation,
  deleteReservation,
} from "../apis/reservation-api.js";

export default function Modal({
  events,
  event,
  setShowModal,
  setShowConfirmation,
  setAllReservations,
  socket,
  pendingReservationId,
}) {
  const [day, setDay] = useState(event.start);
  const [start, setStart] = useState(event.start);
  const [end, setEnd] = useState(event.end);
  const [showDayCalendar, setShowDayCalendar] = useState(false);
  const [showStartTimeDrop, setShowStartTimeDrop] = useState(false);
  const [showEndTimeDrop, setShowEndTimeDrop] = useState(false);
  const [availableDays, setAvailableDays] = useState([]);
  const [availStartTimes, setAvailStartTimes] = useState([]);
  const [availEndTimes, setAvailEndTimes] = useState([]);
  const dayRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);
  const [alertDate, setAlertDate] = useState(false);
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertActivity, setAlertActivity] = useState(false);
  const [status, setStatus] = useState("");
  const [activity, setActivity] = useState("");
  const [triggerReservation, setTriggerReservation] = useState(false);
  let timeOut;

  const handleCancelClick = () => {
    setShowModal(false);
    if (!event.extendedProps.status) {
      event.setProp("borderColor", "#84e987");
      event.setProp("textColor", "#000");
      event.setProp("backgroundColor", "#84e987");
    } else if (event.extendedProps.status) {
      event.setProp("borderColor", "#df9294");
      event.setProp("textColor", "#000");
      event.setProp("backgroundColor", "#df9294");
    }
    deleteReservation(pendingReservationId).then(() => {
      clearTimeout(timeOut);
      socket.send(
        JSON.stringify({
          status: "cancelled",
          pendingReservationId: pendingReservationId,
        }),
      );
    });
  };

  const handleDayClick = () => {
    setShowDayCalendar(!showDayCalendar);
  };

  const handleStartTimeClick = () => {
    setShowStartTimeDrop(!showStartTimeDrop);
  };

  const handleEndTimeClick = () => {
    setShowEndTimeDrop(!showEndTimeDrop);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dayRef.current && !dayRef.current.contains(event.target)) {
        setShowDayCalendar(false);
      }
      if (startRef.current && !startRef.current.contains(event.target)) {
        setShowStartTimeDrop(false);
      }
      if (endRef.current && !endRef.current.contains(event.target)) {
        setShowEndTimeDrop(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dayRef, endRef, startRef]);

  useEffect(() => {
    const tempAvailDays = [];
    events.forEach((event) => {
      if (
        !event.extendedProps.status &&
        !tempAvailDays.includes(event.start.toISOString().split("T")[0])
      ) {
        tempAvailDays.push(event.start.toISOString().split("T")[0]);
      }
    });
    setAvailableDays(tempAvailDays);
  }, [events]);

  useEffect(() => {
    timeOut = setTimeout(() => {
      socket.send(
        JSON.stringify({
          status: "cancelled",
          pendingReservationId: pendingReservationId,
        }),
      );
      setShowModal(false);
    }, 61000);
  }, []);

  useEffect(() => {
    const availStartTimes = [];
    const availEndTimes = [];
    events.forEach((event) => {
      if (
        !event.extendedProps.status &&
        day.toISOString().split("T")[0] ===
          event.start.toISOString().split("T")[0]
      ) {
        availStartTimes.push(event.start);
      }
      if (
        !event.extendedProps.status &&
        day.toISOString().split("T")[0] ===
          event.end.toISOString().split("T")[0]
      ) {
        availEndTimes.push(event.end);
      }
    });
    availStartTimes.sort((a, b) => a.getTime() - b.getTime());
    availEndTimes.sort((a, b) => a.getTime() - b.getTime());
    setAvailStartTimes(availStartTimes);
    setAvailEndTimes(availEndTimes);
  }, [day]);

  useEffect(() => {
    if (end.getTime() <= start.getTime()) {
      setAlertDate(true);
    } else {
      setAlertDate(false);
    }
  }, [start, end]);

  useEffect(() => {
    setDay(event.start);
    setStart(event.start);
    setEnd(event.end);
  }, [event]);

  const handleReservationInput = () => {
    setAlertStatus(!status);
    setAlertActivity(!activity);
    setAlertDate(end.getTime() <= start.getTime());
  };

  const handleReservationClick = () => {
    handleReservationInput();
    setTriggerReservation(true);
  };

  useEffect(() => {
    if (triggerReservation) {
      if (!alertActivity && !alertDate && !alertStatus) {
        deleteReservation(pendingReservationId).then(() => {
          clearTimeout(timeOut);
          socket.send(
            JSON.stringify({
              status: "cancelled",
              pendingReservationId: pendingReservationId,
            }),
          );
          createReservation({
            hostId: "613f3bda5f4378b64b448f20",
            availability: {
              startAt: start.toISOString(),
              endAt: end.toISOString(),
              _id: event.extendedProps.availId,
            },
            guestIds: ["613f3c3c5f4378b64b448f21", "613f3c4a5f4378b64b448f22"],
            activity: activity,
            status: "confirmed",
            isPrivate: status === "private",
            spaceId: event.extendedProps.spaceId,
          }).then((newReservation) => {
            setShowModal(false);
            setTriggerReservation(false);
            setShowConfirmation(true);
            clearTimeout(timeOut);
            socket.send(
              JSON.stringify({
                status: "cancelled",
                pendingReservationId: pendingReservationId,
              }),
            );
            socket.send(JSON.stringify(newReservation));
            setAllReservations((prevReservations) => [
              ...prevReservations,
              newReservation,
            ]);
          });
        });
      } else {
        setTriggerReservation(false);
      }
    }
  }, [triggerReservation, alertActivity, alertStatus, alertDate]);

  const handleRadioInputClick = (e) => {
    setStatus(e.target.value);
    setAlertStatus(false);
  };

  const handleActivityInputChange = (e) => {
    setAlertActivity(false);
    setActivity(e.target.value.trim());
  };

  return (
    <div className="flex flex-col gap-4 border-4 rounded-xl p-4 fixed z-[1] bg-[#fafafa] top-[25%] left-[20%] w-[900px] h-[525px] overflow-y-scroll shadow-2xl">
      <div className="flex flex-row-reverse" onClick={handleCancelClick}>
        <MdOutlineCancel className="size-6" />
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2 px-8 pt-8 pb-12 border bg-white rounded-xl">
          <div className="flex gap-2">
            <div className={`${alertDate ? "text-[#f30b10]" : ""}`}>*</div>
            <div className="font-bold">Date</div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 self-start" ref={dayRef}>
              <div
                className={`flex justify-between gap-2 p-2 border rounded-xl`}
                onClick={handleDayClick}
              >
                <div>{format(day, "dd MMM, yyyy")}</div>
                <IoCalendarClearOutline className="mt-[3px]" />
              </div>
              {/*<div className={`${showDayCalendar ? "" : "hidden"}`}>
                <DayCalendar
                  availableDays={availableDays}
                  day={day}
                  setDay={setDay}
                  setShowDayCalendar={setShowDayCalendar}
                />
              </div>*/}
            </div>
            <div className="pt-2 self-start">De</div>
            <div className="flex flex-col gap-2 self-start" ref={startRef}>
              <div
                className={`flex p-2 gap-2 rounded-xl ${alertDate ? "border-2 border-[#f30b10]" : "border"}`}
                onClick={handleStartTimeClick}
              >
                <div>{format(start, "HH:mm")}</div>
                <CiClock2 className="mt-[3px]" />
              </div>
              <div className={`${showStartTimeDrop ? "" : "hidden"}`}>
                <TimePicker
                  availTimes={availStartTimes}
                  setTime={setStart}
                  setShowTimeDrop={setShowStartTimeDrop}
                />
              </div>
            </div>
            <div className="pt-2 self-start">à</div>
            <div className="flex flex-col gap-2 self-start" ref={endRef}>
              <div
                className={`flex p-2 gap-2 rounded-xl ${alertDate ? "border-2 border-[#f30b10]" : "border"}`}
                onClick={handleEndTimeClick}
              >
                <div>{format(end, "HH:mm")}</div>
                <CiClock2 className="mt-[3px]" />
              </div>
              <div className={`${showEndTimeDrop ? "" : "hidden"}`}>
                <TimePicker
                  availTimes={availEndTimes}
                  setTime={setEnd}
                  setShowTimeDrop={setShowEndTimeDrop}
                />
              </div>
            </div>
            {alertDate && (
              <div className="mt-[6px] text-[#f30b10] text-xl">
                Date invalide
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6 p-8 border bg-white rounded-xl">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              {alertStatus && (
                <>
                  <div className="flex gap-2 text-[#f30b10]">
                    <MdCancel className="mt-1" />
                    <div className="font-bold">Champ obligatoire</div>
                  </div>
                </>
              )}
              <div className="flex gap-2">
                <div className={`${alertStatus ? "text-[#f30b10]" : ""}`}>
                  *
                </div>
                <div className="font-bold">Status</div>
              </div>
            </div>
            <form className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="private"
                  className={``}
                  name="status"
                  value="private"
                  onClick={(e) => handleRadioInputClick(e)}
                />
                <label htmlFor="private" className="ml-2">
                  privée
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="public"
                  className=""
                  name="status"
                  value="public"
                  onClick={(e) => handleRadioInputClick(e)}
                />
                <label htmlFor="public" className="ml-2">
                  publique
                </label>
              </div>
            </form>
          </div>
          {status === "public" && (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <IoPeople className="mt-1" />
                <div className="font-bold">Invités</div>
              </div>
              <form className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="guest"
                    className="h-[35px] w-[200px] pl-2 border rounded-xl focus:outline-none"
                  />
                </div>
              </form>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              {alertActivity && (
                <>
                  <div className="flex gap-2 text-[#f30b10]">
                    <MdCancel className="mt-1" />
                    <div className="font-bold">Champ obligatoire</div>
                  </div>
                </>
              )}
              <div className="flex gap-2">
                <div className={`${alertActivity ? "text-[#f30b10]" : ""}`}>
                  *
                </div>
                <div className="font-bold">Activité</div>
              </div>
            </div>
            <form className="">
              <textarea
                type="text"
                id="guest"
                rows="4"
                cols="45"
                className={`p-2 rounded-xl focus:outline-none ${alertActivity ? "border-2 border-[#f30b10]" : "border"}`}
                onChange={(e) => handleActivityInputChange(e)}
              ></textarea>
            </form>
          </div>
        </div>
        {(alertStatus || alertActivity || alertDate) && (
          <div className="flex gap-2 text-[#f30b10] font-bold">
            <div className="mt-[1px]">*</div>
            <div>Champs obligatoires</div>
          </div>
        )}
        <div className="mt-4 flex flex-row-reverse">
          <div
            className="border bg-white p-2 rounded-xl font-bold hover:bg-[#d4d5d6]"
            onClick={handleReservationClick}
          >
            Réserver
          </div>
        </div>
      </div>
    </div>
  );
}
