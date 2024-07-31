import React, { useEffect, useState } from "react";
import { CgOrganisation } from "react-icons/cg";
import { MdOutlineSubtitles } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";

export default function Card({ space, cardSelected, onCardClick }) {
  const { images, name, organisation, capacity } = space;
  const [remainTimeBeforeNext, setRemainTimeBeforeNext] = useState(0);
  const [hasOngoingActivity, setHasOngoingActivity] = useState(false);

  const current = new Date();
  const handleClick = (e) => {
    e.preventDefault();
    onCardClick(cardSelected, space);
  };

  const setUTCDate = (year, month, date, hours, minutes, seconds) => {
    return new Date(year, month, date, hours, minutes, seconds);
  };

  const checkOngoingActivity = () => {
    setHasOngoingActivity(
      space.availabilities.some((avail) => {
        const localEndTime = new Date(avail.endAt);
        return (localEndTime.getTime() - current.getTime()) / 1000 > 1800;
      }),
    );
  };

  useEffect(() => {
    alertNextAvailability();
    checkOngoingActivity();
  }, []);

  const alertNextAvailability = () => {
    space.availabilities.some((avail) => {
      const localStartTime = new Date(avail.startAt);
      if (
        localStartTime.getTime() - current.getTime() > 0 &&
        (localStartTime.getTime() - current.getTime()) / 1000 < 3600
      ) {
        setRemainTimeBeforeNext(
          Math.floor((localStartTime.getTime() - current.getTime()) / 60000),
        );
      }
      return (
        localStartTime.getTime() - current.getTime() > 0 &&
        (localStartTime.getTime() - current.getTime()) / 1000 < 3600
      );
    });
  };

  return (
    <a
      className={`cards ${cardSelected ? "flex flex-row h-28" : "card rounded-lg flex flex-col gap-2 border"}`}
      onClick={handleClick}
    >
      <div className="">
        <img
          className={`rounded-lg object-cover ${cardSelected ? "w-40 h-full" : "w-full h-[200px]"}  `}
          src={images[0].url}
          alt="space photo"
        />
      </div>
      <div className="flex flex-col px-1 py-2 gap-0 flex-1">
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
        {hasOngoingActivity && (
          <div className="flex flex-row-reverse">
            <p className="bg-[#cccccc] py-1 px-2 rounded-full border-2 border-white font-bold my-1 mx-3">
              Activité en cours
            </p>
          </div>
        )}
        {remainTimeBeforeNext > 0 && (
          <div className="flex flex-row-reverse">
            <p className="bg-[#cccccc] py-1 px-2 rounded-full border-2 border-white font-bold my-2 mx-3">
              {`Dispo dans ${remainTimeBeforeNext} minute${remainTimeBeforeNext > 1 ? "s" : ""}`}
            </p>
          </div>
        )}
      </div>
    </a>
  );
}
