import React from "react";
import { CgOrganisation } from "react-icons/cg";
import { MdOutlineSubtitles } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";

export default function Card({ space, cardSelected, onCardClick }) {
  const { images, name, organisation, capacity } = space;
  const handleClick = (e) => {
    e.preventDefault();
    onCardClick(cardSelected, space);
  };
  return (
    <a className="card rounded-lg flex flex-col" href="" onClick={handleClick}>
      <div className="card_img_container">
        <img
          className="card_img rounded-lg z-0 brightness-105 contrast-125 saturate-150"
          src={images[0].url}
          alt="space photo"
        />
      </div>
      <div className="flex flex-col px-1 py-2 w-80 h-32">
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
    </a>
  );
}
