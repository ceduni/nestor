import React, { useEffect, useState } from 'react';

import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';

import CardDetailCalendar from './CardDetailCalendar';
import CardDetailDescription from './CardDetailDescription';


export default function CardDetail({spaceDetail}) {
    const [slideImages, setSlideImages] = useState([]);
    const [isApercu, setIsApercu] = useState(true);
    const [isReservation, setIsReservation] = useState(false);

    const handleApercuClick = ()=>{
        setIsApercu(true);
        setIsReservation(false);
    }

    const handleReservationClick = ()=>{
        setIsApercu(false);
        setIsReservation(true);
    }

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
                <header className='border-b-2 py-2'>
                    <nav>
                        <ul className='flex gap-x-8'>
                            <li className={`card_detail_options ${isApercu === true ? "selected" : ""}`} onClick={handleApercuClick}>Aperçu</li>
                            <li className={`card_detail_options ${isReservation === true ? "selected" : ""}`} onClick={handleReservationClick}>Réservation</li>
                        </ul>
                    </nav>
                </header>

                {isApercu && <CardDetailDescription spaceDetail={spaceDetail}/>}

                {isReservation && <CardDetailCalendar />}
            </section>
        </div>  
    );
}