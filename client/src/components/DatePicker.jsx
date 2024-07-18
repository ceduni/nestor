import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import { Fragment, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DatePicker({
  filters,
  setFilters,
  hasClickedOutsideDate,
  setIsDateClicked,
  isDateClicked,
  isDateItemClicked,
  setIsDateItemClicked,
}) {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function handleDateClick(day) {
    setSelectedDay(day);
    setIsDateItemClicked(true);
    setIsDateClicked(false);
    setFilters({ ...filters, date: day.toISOString().split("T")[0] });
  }

  return (
    <div
      className={`shadow flex flex-col gap-4 bg-white z-10 rounded-lg absolute top-[72px] border w-[300px] right-[50px] ${isDateClicked && !isDateItemClicked && !hasClickedOutsideDate ? "" : "invisible"}`}
    >
      <div className="flex items-center p-2">
        <h2 className="flex-auto font-semibold text-gray-900">
          {format(firstDayCurrentMonth, "MMMM yyyy")}
        </h2>
        <button
          type="button"
          onClick={previousMonth}
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
        </button>
        <button
          onClick={nextMonth}
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-7 text-xs leading-6 text-center text-gray-500">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <div className="grid grid-cols-7 text-sm">
          {days.map((day, dayIdx) => (
            <div
              key={day.toString()}
              className={classNames(
                dayIdx === 0 && colStartClasses[getDay(day)],
                "py-1.5",
              )}
            >
              <button
                type="button"
                onClick={() => handleDateClick(day)}
                className={classNames(
                  isEqual(day, selectedDay) && "text-white",
                  !isEqual(day, selectedDay) && isToday(day) && "text-red-500",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    "text-gray-900",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    "text-gray-400",
                  isEqual(day, selectedDay) && isToday(day) && "bg-red-500",
                  isEqual(day, selectedDay) && !isToday(day) && "bg-gray-900",
                  !isEqual(day, selectedDay) && "hover:bg-gray-200",
                  (isEqual(day, selectedDay) || isToday(day)) &&
                    "font-semibold",
                  "mx-auto flex h-8 w-8 items-center justify-center rounded-full",
                )}
              >
                <time dateTime={format(day, "yyyy-MM-dd")}>
                  {format(day, "d")}
                </time>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
