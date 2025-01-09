import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";
import { useEffect, useState } from "react";
import { format, add, sub, startOfWeek, differenceInHours } from "date-fns";
import { fr } from "date-fns/locale";
import { Space } from "../../filters/types";
import { Event } from "../types";
import { CSSTransition } from "react-transition-group";

export default function Calendar({ space }: { space: Space }) {
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

  const [calendarDate, setCalendarDate] = useState<Date>(
    startOfWeek(new Date()),
  );
  const [events, setEvents] = useState<Event[]>([]);
  const [darkGreen, setDarkGreen] = useState(false);

  useEffect(() => {
    const events: Event[] = [];
    space.availabilities.forEach((availability) => {
      const targetCell = document.getElementById(
        availability.startAt.toString(),
      );
      if (targetCell) {
        const cellContainer = document.getElementsByClassName(
          "calendar-day-cells-container",
        )[0];
        events.push({
          startTime: availability.startAt.toString(),
          endTime: availability.endAt.toString(),
          width: targetCell.getBoundingClientRect().width,
          height: targetCell.getBoundingClientRect().height,
          x:
            targetCell.getBoundingClientRect().x -
            cellContainer.getBoundingClientRect().x,
          y:
            targetCell.getBoundingClientRect().y -
            cellContainer.getBoundingClientRect().y,
        });
      }
    });
    setEvents(events);
  }, [calendarDate]);

  const handleEventClick = () => {
    setDarkGreen(true);
  };

  const handleBackArrowClick = () =>
    setCalendarDate((prev) => sub(prev, { weeks: 1 }));
  const handleForwardArrowClick = () =>
    setCalendarDate((prev) => add(prev, { weeks: 1 }));
  const handleTodayClick = () => setCalendarDate(startOfWeek(new Date()));

  const calculateCellTimes = (index: number) => {
    const dayIndex = index % 7;
    const hourIndex = Math.floor(index / 7);
    const cellDate = add(calendarDate, { days: dayIndex });
    return add(cellDate, { hours: hourIndex });
  };

  const calculateEventSlots = (startTime: Date, endTime: Date) => {
    return differenceInHours(endTime, startTime);
  };

  const calculateEventHeight = (
    startTime: Date,
    endTime: Date,
    height: number,
  ) => {
    const hoursBetween = calculateEventSlots(endTime, startTime);
    return height * hoursBetween;
  };

  return (
    <CSSTransition timeout={500} className="card-left-layout">
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
                  onClick={handleBackArrowClick}
                />
                <div onClick={handleTodayClick}>Aujourd'hui</div>
                <IoIosArrowForward
                  className="arrow"
                  onClick={handleForwardArrowClick}
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
                  const startTime = calculateCellTimes(adjustedIndex);

                  return (
                    <div
                      key={index}
                      id={startTime.toISOString()}
                      className="calendar-day-cells-item"
                    ></div>
                  );
                })}
                {events.map((event, index) => (
                  <div
                    key={index}
                    style={{
                      position: "absolute",
                      top: `${event.y}px`,
                      left: `${event.x}px`,
                      width: `${event.width}px`,
                      height: `${calculateEventHeight(new Date(event.startTime), new Date(event.endTime), event.height)}px`,
                      padding: "5px",
                    }}
                  >
                    <div
                      className="event-container"
                      onClick={() => handleEventClick()}
                    >
                      <div className="event-slots-container">
                        <div className="event-item">
                          {`${format(event.startTime, "H:mm", { locale: fr })} - ${format(event.endTime, "H:mm", { locale: fr })}`}
                        </div>
                        {(() => {
                          const numberOfSlots = calculateEventSlots(
                            new Date(event.startTime),
                            new Date(event.endTime),
                          );

                          return Array.from({ length: numberOfSlots - 1 }).map(
                            (_, index) => (
                              <div key={index} className="event-slot">
                                test
                              </div>
                            ),
                          );
                        })()}
                      </div>
                      
                    </div>
                  </div>
                ))}
              </div>
              <div className="calendar-last-column"></div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}
