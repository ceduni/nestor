import { addMinutes, format } from "date-fns";
import { IoCalendarClearOutline } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import { IoPeople } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import DayCalendar from "./DayCalendar";
import TimePicker from "./TimePicker.jsx";
export default function Modal({ events, event, setShowModal }) {
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

  const handleCancelClick = () => {
    setShowModal(false);
    if (
      typeof event.extendedProps.isBooked !== undefined &&
      !event.extendedProps.isBooked
    ) {
      event.setProp("borderColor", "#84e987");
      event.setProp("textColor", "#000");
      event.setProp("backgroundColor", "#84e987");
    } else if (
      typeof event.extendedProps.isBooked !== undefined &&
      event.extendedProps.isBooked
    ) {
      event.setProp("borderColor", "#df9294");
      event.setProp("textColor", "#000");
      event.setProp("backgroundColor", "#df9294");
    }
  };

  const handleDayClick = () => {
    setShowDayCalendar(!showDayCalendar);
  };

  const handleStartTimeClick = () => {
      setShowStartTimeDrop(!showStartTimeDrop);
  }

  const handleEndTimeClick = () => {
      setShowEndTimeDrop(!showEndTimeDrop);
  }

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
  }, [dayRef,endRef, startRef]);

  useEffect(() => {
    const tempAvailDays = [];
    events.forEach((event) => {
      if (!tempAvailDays.includes(event.start.toISOString().split("T")[0])) {
        tempAvailDays.push(event.start.toISOString().split("T")[0]);
      }
    });
    setAvailableDays(tempAvailDays);
  }, [events]);

  useEffect(() => {
    const availStartTimes = [];
    const availEndTimes = [];
    events.forEach((event) => {
      if (
        day.toISOString().split("T")[0] ===
        event.start.toISOString().split("T")[0]
      ) {
          availStartTimes.push(event.start);
      }
        if (
            day.toISOString().split("T")[0] ===
            event.end.toISOString().split("T")[0]
        ) {
            availEndTimes.push(event.end);
        }
    });
      availStartTimes.sort((a, b) => a.getTime() - b.getTime());
      availEndTimes.sort((a, b) => a.getTime() - b.getTime());
    setAvailStartTimes(availStartTimes);
    setAvailEndTimes(availEndTimes)
  }, [events, day]);

  return (
    <div
      className="flex flex-col gap-4 border-4 rounded-xl p-4 fixed z-[1] bg-white top-[30%] left-[20%] w-[900px] h-[525px] overflow-y-scroll shadow-2xl"
    >
      <div className="flex flex-row-reverse" onClick={handleCancelClick}>
        <MdOutlineCancel className="size-6" />
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2 px-8 pt-8 pb-12 border-2 rounded-xl">
          <div className="font-bold">Date</div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 self-start" ref={dayRef}>
              <div
                className="flex justify-between gap-2 p-2 border-2 rounded-xl"
                onClick={handleDayClick}
              >
                <div>{format(day, "dd MMM, yyyy")}</div>
                <IoCalendarClearOutline className="mt-[3px]" />
              </div>
              <div className={`${showDayCalendar ? "" : "hidden"}`}>
                <DayCalendar
                  availableDays={availableDays}
                  day={day}
                  setDay={setDay}
                  setShowDayCalendar={setShowDayCalendar}
                />
              </div>
            </div>
            <div className="pt-2 self-start">De</div>
            <div className="flex flex-col gap-2 self-start" ref={startRef}>
              <div className="flex p-2 gap-2 border-2 rounded-xl" onClick={handleStartTimeClick}>
                <div>{format(start, "HH:mm")}</div>
                <CiClock2 className="mt-[3px]" />
              </div>
              <div className={`${showStartTimeDrop ? "" : "hidden"}`}>
                <TimePicker
                  availTimes={availStartTimes}
                  setStart={setStart}
                  setShowStartTimeDrop={setShowStartTimeDrop}
                />
              </div>
            </div>
            <div className="pt-2 self-start">à</div>
            <div className="flex flex-col gap-2 self-start" ref={endRef}>
              <div className="flex p-2 gap-2 border-2 rounded-xl" onClick={handleEndTimeClick}>
                <div>{format(end, "HH:mm")}</div>
                <CiClock2 className="mt-[3px]" />
              </div>
                <div className={`${showEndTimeDrop ? "" : "hidden"}`}>
                    <TimePicker
                        availTimes={availEndTimes}
                        setStart={setEnd}
                        setShowTimeDrop={setShowEndTimeDrop}
                    />
                </div>
            </div>
          </div>
        </div>
          <div className="flex flex-col gap-6 p-8 border-2 rounded-xl">
              <div className="flex flex-col gap-2">
                  <div className="font-bold">Status</div>
                  <form className="flex flex-col gap-2">
                      <div className="flex gap-2">
                          <input type="radio" id="private" className="accent-black" />
                          <label htmlFor="private" className="ml-2">
                              privée
                          </label>
                      </div>
                      <div className="flex gap-2">
                          <input type="radio" id="public" className="accent-black" />
                          <label htmlFor="public" className="ml-2">
                              publique
                          </label>
                      </div>
                  </form>
              </div>
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
                              className="h-[35px] w-[200px] pl-2 border-2 rounded-xl"
                          />
                      </div>
                  </form>
              </div>
              <div className="flex flex-col gap-2">
                  <div className="font-bold">Activité</div>
                  <form className="">
            <textarea
                type="text"
                id="guest"
                rows="4"
                cols="45"
                className="pl-2 border-2 rounded-xl"
            ></textarea>
                  </form>
              </div>
          </div>
        <div className="mt-4 flex flex-row-reverse">
          <div className="border p-2 rounded-xl font-bold">Réserver</div>
        </div>
      </div>
    </div>
  );
}
