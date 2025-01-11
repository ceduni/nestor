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
  const [activeSlot, setActiveSlot] = useState<string | null>(null);

  useEffect(() => {
    const fetchedEvents: Event[] = space.availabilities
      .map((availability) => {
        const targetCell = document.getElementById(
          availability.startAt.toString(),
        );
        if (!targetCell) return null;
        const cellContainer = document.getElementsByClassName(
          "calendar-day-cells-container",
        )[0];
        const { width, height, x, y } = targetCell.getBoundingClientRect();
        const offsetX = x - cellContainer.getBoundingClientRect().x;
        const offsetY = y - cellContainer.getBoundingClientRect().y;
        return {
          startTime: availability.startAt.toString(),
          endTime: availability.endAt.toString(),
          width,
          height,
          x: offsetX,
          y: offsetY,
        };
      })
      .filter(Boolean) as Event[];
    setEvents(fetchedEvents);
  }, [calendarDate, space.availabilities]);

  const handleEventClick = () => setDarkGreen(true);
  const handleBackArrowClick = () =>
    setCalendarDate((prev) => sub(prev, { weeks: 1 }));
  const handleForwardArrowClick = () =>
    setCalendarDate((prev) => add(prev, { weeks: 1 }));
  const handleTodayClick = () => setCalendarDate(startOfWeek(new Date()));

  // Click handler updated to use UUID
  const handleEventSlotClick = (customId: string) => setActiveSlot(customId);

  const calculateCellTimes = (index: number) =>
    add(add(calendarDate, { days: index % 7 }), {
      hours: Math.floor(index / 7),
    });
  const calculateEventSlots = (startTime: Date, endTime: Date) =>
    differenceInHours(endTime, startTime);
  const calculateEventHeight = (
    startTime: Date,
    endTime: Date,
    height: number,
  ) => height * calculateEventSlots(startTime, endTime);

  const generateStableId = (startTime: Date, endTime: Date, idx: number) => {
    return `${startTime}-${endTime}-${idx}`;
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

          <div className="calendar-days-list-container">
            <div className="calendar-empty-cell-start"></div>
            {days.map((day, index) => (
              <div
                key={day}
                className={`calendar-days-list-item-${index === 0 ? "start" : index === days.length - 1 ? "end" : "between"}`}
              >
                {day}
              </div>
            ))}
            <div className="calendar-empty-cell-end"></div>
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
                {Array.from({ length: 175 }).map((_, index) => (
                  <div
                    key={index}
                    id={calculateCellTimes(index - 7).toISOString()}
                    className={
                      index < 7
                        ? "calendar-day-cells-item-first-row"
                        : "calendar-day-cells-item"
                    }
                  ></div>
                ))}

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
                    <div className="event-container" onClick={handleEventClick}>
                      <div className="event-slots-container">
                        <div className="event-first-slot">
                          {`${format(event.startTime, "H:mm", { locale: fr })} - ${format(event.endTime, "H:mm", { locale: fr })}`}
                        </div>
                        {Array.from({
                          length:
                            calculateEventSlots(
                              new Date(event.startTime),
                              new Date(event.endTime),
                            ) - 2,
                        }).map((_, idx) => {
                          const customId = generateStableId(
                            new Date(event.startTime),
                            new Date(event.endTime),
                            idx,
                          );
                          return (
                            <div
                              key={customId}
                              className={`event-slot ${activeSlot === customId ? "active" : ""}`}
                              onClick={() => handleEventSlotClick(customId)}
                            ></div>
                          );
                        })}

                        <div className="event-last-slot">test</div>
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
