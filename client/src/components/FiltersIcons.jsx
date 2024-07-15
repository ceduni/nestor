import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { LuSchool2, LuMicroscope } from "react-icons/lu";
import { IoLibraryOutline } from "react-icons/io5";
import { VscCoffee } from "react-icons/vsc";
import { CiMusicNote1 } from "react-icons/ci";
import { MdOutlinePark } from "react-icons/md";
import { SlScreenDesktop } from "react-icons/sl";
import { TfiBlackboard } from "react-icons/tfi";
import { BsPlug, BsProjector } from "react-icons/bs";
import { FaWifi } from "react-icons/fa6";

const icons = [
  { name: LuSchool2, title: "university" },
  { name: IoLibraryOutline, title: "library" },
  { name: VscCoffee, title: "coffee" },
  { name: MdOutlinePark, title: "nature" },
  { name: LuMicroscope, title: "laboratory" },
  { name: CiMusicNote1, title: "music" },
  { name: SlScreenDesktop, title: "screen" },
  { name: TfiBlackboard, title: "whiteboard" },
  { name: BsPlug, title: "plug" },
  { name: BsProjector, title: "projector" },
  { name: FaWifi, title: "wifi" },
];

const toFR = {
  university: "université",
  library: "bibliothèque",
  coffee: "café",
  nature: "nature",
  laboratory: "laboratoire",
  music: "musique",
  screen: "écran",
  whiteboard: "tableau",
  plug: "prise",
  projector: "projecteur",
  wifi: "wifi",
};

const toEN = {
  université: "university",
  bibliothèque: "library",
  café: "coffee",
  nature: "nature",
  laboratoire: "laboratory",
  musique: "music",
  écran: "screen",
  tableau: "whiteboard",
  prise: "plug",
  projecteur: "projector",
  wifi: "wifi",
};

export default function FiltersIcons({ setIconFilters, iconFilters }) {
  const handleIconClick = (e) => {
    e.preventDefault();
    const iconFilter =
      toEN[e.currentTarget.querySelector(".filter_icons_text").textContent];
    if (iconFilters.indexOf(iconFilter) !== -1) {
      setIconFilters(iconFilters.filter((icon) => icon !== iconFilter));
    } else {
      setIconFilters([...iconFilters, iconFilter]);
    }
  };

  return (
    <div className="flex justify-center gap-10 m-3">
      <ul className="flex justify-center gap-6">
        {icons.map((icon, index) => {
          const IconComponent = icon.name;
          return (
            <li
              className="filter_icons flex flex-col items-center gap-y-2 opacity-70"
              key={index}
              onClick={handleIconClick}
            >
              <IconComponent className="size-6" />
              <p
                id="iconLabel"
                className={`filter_icons_text text-sm ${iconFilters.indexOf(icon.title) !== -1 ? "selected" : ""}`}
              >
                {toFR[icon.title]}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
