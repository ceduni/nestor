import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
export default function CalendarHeader() {
  return (
    <div>
      <div className="calendar-header-container">
        <div className="date-label">Janvier 2022</div>
        <div className="calendar-header-left-container">
          <div className="view-button-container">
            <div className="week-tag">Semaine</div>
            <IoIosArrowDown className="arrow" />
          </div>
          <div className="today-button-container">
            <IoIosArrowBack className="arrow" />
            <div>Aujourd'hui</div>
            <IoIosArrowForward className="arrow" />
          </div>
        </div>
      </div>
      <div className="days-list-container">
        <div className="days-list-item-0">Lundi</div>
        <div className="days-list-item-1">Mardi</div>
        <div className="days-list-item-2">Mercredi</div>
        <div className="days-list-item-3">Jeudi</div>
        <div className="days-list-item-4">Vendredi</div>
        <div className="days-list-item-5">Samedi</div>
        <div className="days-list-item-6">Dimanche</div>
      </div>
    </div>
  );
}

