
import {IoIosArrowBack, IoIosArrowDown, IoIosArrowForward} from "react-icons/io";

export default function Calendar() {
    const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);
    const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    return (
        <div className="card-left-layout">
            <div>
                <div className="calendar-header-container">
                    <div className="calendar-date-label">Janvier 2022</div>
                    <div className="calendar-header-left-container">
                        <div className="calendar-view-button-container">
                            <div className="calendar-week-tag">Semaine</div>
                            <IoIosArrowDown className="arrow" />
                        </div>
                        <div className="calendar-today-button-container">
                            <IoIosArrowBack className="arrow" />
                            <div>Aujourd'hui</div>
                            <IoIosArrowForward className="arrow" />
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
                <div className="calendar-columns-container">
                    <div className="calendar-hour-column">
                        {hours.map((hour, index) => (
                            <div key={index} className="calendar-hour-item">{hour}</div>
                        ))}
                    </div>
                    <div className="calendar-day-cells-container">
                        {Array.from({ length: 96 }).map((_, index) => (
                            <div
                                key={index}
                                className={`calendar-day-cells-item${
                                    index < 7 ? "-first-row" : ""
                                }`}
                            ></div>
                        ))}
                    </div>
                    <div className="calendar-last-column"></div>
                </div>
            </div>
        </div>
    )
}