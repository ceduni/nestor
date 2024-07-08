import React from 'react';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { frCA } from 'date-fns/locale';
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  'en-US': frCA,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const bookingList = [
  {
    'title': 'All Day Event very long title',
    'start': new Date(2024, 6, 5, 10, 0),
    'end': new Date(2024, 6, 5, 12, 0)
  },
  {
    'title': 'Long Event',
    'start': new Date(2024, 6, 6, 13, 0),
    'end': new Date(2024, 6, 6, 15, 0)
  },
  {
    'title': 'New Event',
    'start': new Date(2024, 6, 4, 13, 0),
    'end': new Date(2024, 6, 4, 15, 0)
  },
]

export default function CardDetailCalendar() {
    const handleSelectEvent = (e)=>{
        // e.preventDefault();
        console.log("Selected event : " + e.title);
    }
    return (
        <div>
            <form className='flex gap-10 justify-center items-center py-5 border'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">Date et heure de début</label>
                        <input type="datetime-local" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">Date et heure de fin</label>
                        <input type="datetime-local" />
                    </div>
                    <button className='border p-2 rounded-full' type='submit'>Réserver</button>
                </form>
                <div className='py-5'>
                    <Calendar
                        localizer={localizer}
                        events={bookingList}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        defaultView="week"
                        views={{month:true, week: true, day: true}}
                        onSelectEvent={handleSelectEvent}
                    />
                </div>
        </div>
    );
}

