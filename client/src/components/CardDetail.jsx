import React, { useEffect, useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import { CgOrganisation } from "react-icons/cg";
import { MdOutlineSubtitles, MdOutlineDescription } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";

import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';

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


export default function CardDetail({spaceDetail}) {
    const [slideImages, setSlideImages] = useState([]);
    useEffect(()=>{
        setSlideImages(spaceDetail.images);
    }, [spaceDetail]);
    // console.log(slideImages); 
    const handleSelectEvent = (e)=>{
        // e.preventDefault();
        console.log("Selected event : " + e.title);
    }
    return (
        <div className='w-full card_detail rounded-xl flex flex-col'>
            <div className="slide-container">
                <Slide easing="ease">
                    {slideImages.map((slide, index) => {
                        return (
                            <div className={slide} key={slide}>
                                <div className='slide_bg rounded-lg bg-no-repeat bg-cover' style={{ backgroundImage: `url(${slideImages[index].url})` }}>
                                    <span className=''>image {index + 1} / {slideImages.length}</span>
                                </div>
                            </div>
                        );
                    })}
                </Slide>
            </div>
            <section className='p-2'>
                <header className='py-2'>
                    <nav>
                        <ul className='flex gap-x-8'>
                            <li>Aperçu</li>
                            <li>Réservation</li>
                        </ul>
                    </nav>
                </header>
                <ul className='py-5'>
                    <li className='font-bold flex items-center gap-2'><MdOutlineSubtitles />{spaceDetail.name}</li>
                    <li className='flex items-center gap-2'><CgOrganisation />{spaceDetail.organisation}</li>
                    <li className='flex items-center gap-2'><IoPeopleOutline />{spaceDetail.capacity} personnes</li>
                    <li className='flex items-center gap-2'><MdOutlineDescription />{spaceDetail.description}</li>
                        {spaceDetail.features.map(equip => (
                            <li className='flex items-center gap-2' key={uuidv4()}>{equip}</li>
                        ))}
                </ul>
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
            </section>
        </div>  
    );
}