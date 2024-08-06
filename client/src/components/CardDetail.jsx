import React, { useEffect, useState } from "react";
import "react-slideshow-image/dist/styles.css";
import Calendar from "./Calendar.jsx";
import CardDetailDescription from "./CardDetailDescription";
export default function CardDetail({ spaceDetail }) {
  const [isApercu, setIsApercu] = useState(true);
  const [isReservation, setIsReservation] = useState(false);

  const handleApercuClick = () => {
    setIsApercu(true);
    setIsReservation(false);
  };

  const handleReservationClick = () => {
    setIsApercu(false);
    setIsReservation(true);
  };

  return (
    <div className="card_detail rounded-xl flex flex-col w-[900px] sticky border top-[270.98px] self-start">
      <div className="grid gap-2 grid-cols-8 h-[270px] grid-rows-auto">
        {spaceDetail.images.map((image, index) => (
          <div key={index} className={`grid-image grid-image-${index} `}>
            <img
              src={image.url}
              className="object-cover w-full h-full rounded-lg"
              alt="space photo"
            />
          </div>
        ))}
      </div>
      <section className="p-2">
        <header className="border-b-2 p-2">
          <nav>
            <ul className="flex gap-x-8">
              <li
                className={`card_detail_options ${isApercu === true ? "selected" : ""}`}
                onClick={handleApercuClick}
              >
                Aperçu
              </li>
              <li
                className={`card_detail_options ${isReservation === true ? "selected" : ""}`}
                onClick={handleReservationClick}
              >
                Réservation
              </li>
            </ul>
          </nav>
        </header>
        {isApercu && <CardDetailDescription spaceDetail={spaceDetail} />}
        {isReservation && <Calendar spaceDetail={spaceDetail} />}
      </section>
    </div>
  );
}
