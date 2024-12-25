import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";

import { useEffect, useState } from "react";
import { format, add, sub, startOfWeek } from "date-fns";
import { fr } from "date-fns/locale";
import { Space } from "../../filters/types";

export default function Calendar({space}: {space: Space}) {
  const hours = Array.from(
    { length: 24 },
    (_, i) => `${String(i).padStart(2, "0")}:00`,
  );
  const days = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  useEffect(()=> {
  },[])

  const [calendarDate, setCalendarDate] = useState<Date>(startOfWeek(new Date()));

  const handleBackArrowClick = () => {
    setCalendarDate((prevCalendarDate) => sub(prevCalendarDate, { weeks: 1 }));
  };

  const handleForwardArrowClick = () => {
    setCalendarDate((prevCalendarDate) => add(prevCalendarDate, { weeks: 1 }));
  };

  const handleTodayClick = () => {
    setCalendarDate(startOfWeek(new Date()));
  };

  const calculateCellTimes = (index: number) => {
    const dayIndex = index % 7; 
    const hourIndex = Math.floor(index / 7); 
    const cellDate = add(calendarDate, { days: dayIndex }); 
    const startTime = add(cellDate, { hours: hourIndex })
    const endTime = add(startTime, { hours: 1 })
    return { startTime, endTime };
  };

  useEffect(()=> {
    console.log(space);
  },[space])

  return (
    <div className="card-left-layout">
      <div className="card-left-layout-container">
        <div className="calendar-header-container">
          <div className="calendar-date-label">
            {format(calendarDate, "d MMMM", { locale: fr })}
          </div>
          <div className="calendar-header-left-container">
            <div className="calendar-view-button-container">
              <div className="calendar-week-tag">Semaine</div>
              <IoIosArrowDown className="arrow" />
            </div>
            <div className="calendar-today-button-container">
              <IoIosArrowBack
                className="arrow"
                onClick={() => handleBackArrowClick()}
              />
              <div onClick={() => handleTodayClick()}>Aujourd'hui</div>
              <IoIosArrowForward
                className="arrow"
                onClick={() => handleForwardArrowClick()}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="calendar-days-list-container">
            <div className="calendar-empty-cell-start"></div>
            {days.map((day, index) => (
              <div
                key={day}
                className={`calendar-days-list-item-${
                  index === 0
                    ? "start"
                    : index === days.length - 1
                      ? "end"
                      : "between"
                }`}
              >
                {day}
              </div>
            ))}
            <div className="calendar-empty-cell-end"></div>
          </div>
        </div>
        <div className="calendar-columns">
          <div className="calendar-columns-container">
            <div className="calendar-hour-column">
              {hours.map((hour, index) => (
                <div key={index} className="calendar-hour-item">
                  {hour}
                </div>
              ))}
            </div>
            <div className="calendar-day-cells-container">
              {Array.from({ length: 175 }).map((_, index) => {
                const isFirstRow = index < 7;
                if (isFirstRow) {
                  return (
                    <div
                      key={index}
                      className="calendar-day-cells-item-first-row"
                    ></div>
                  );
                }
                const adjustedIndex = index - 7; 
                const { startTime, endTime } =
                  calculateCellTimes(adjustedIndex);
                return (
                  <div
                    key={index}
                    id={`${startTime.toISOString()}_${endTime.toISOString()}`}
                    className="calendar-day-cells-item"
                  ></div>
                );
              })}
            </div>
            <div className="calendar-last-column"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

