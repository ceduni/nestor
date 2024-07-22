import React from "react";
import { CgOrganisation } from "react-icons/cg";
import { MdOutlineSubtitles } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";

export default function Card({ space, cardSelected, onCardClick }) {
  const { images, name, organisation, capacity } = space;

  const current = new Date();
  const handleClick = (e) => {
    e.preventDefault();
    onCardClick(cardSelected, space);
  };

  const checkOngoingActivity = () => {
    return space.availabilities.some((avail) => {
      const endTime = new Date(avail.endAt);
      return (
        avail.isBooked && (endTime.getTime() - current.getTime()) / 1000 > 1800
      );
    });
  };

  return (
    <a
      className={`cards ${cardSelected ? "flex flex-row h-36":"card rounded-lg flex flex-col gap-2 border"}`}
      onClick={handleClick}
    >
      <div className="">
        <img
          className={`rounded-lg object-cover ${cardSelected ? "w-44 h-full" : "w-full h-[200px]"}  `}
          src={images[0].url}
          alt="space photo"
        />
      </div>
      <div className="flex flex-col px-1 py-2 gap-1 flex-1">
        <p className="text-base font-bold flex items-center gap-2">
          <MdOutlineSubtitles className="w-5" />
          {name}
        </p>
        <p className="text-base flex items-center gap-2">
          <CgOrganisation className="w-5" />
          {organisation}
        </p>
        <p className="text-base flex items-center gap-2">
          <IoPeopleOutline className="w-5" />
          {capacity} {capacity > 1 ? "personnes" : "personne"}
        </p>
      </div>
      <div>
        {checkOngoingActivity() && (
          <div className="flex flex-row-reverse">
            <p className="bg-[#cccccc] py-1 px-2 rounded-full border-2 border-white font-bold my-1 mx-3">
              Activité en cours
            </p>
          </div>
        )}
        {/*<div className="flex flex-row-reverse">
          <p className="bg-[#cccccc] py-1 px-2 rounded-full border-2 border-white font-bold my-2 mx-3">
            Dispo dans 5 minutes
          </p>
        </div>*/}
      </div>
    </a>
  );
}
