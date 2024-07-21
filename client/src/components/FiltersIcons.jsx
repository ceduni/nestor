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
  { name: SlScreenDesktop, title: "screen" },
  { name: TfiBlackboard, title: "whiteboard" },
  { name: BsPlug, title: "plug" },
  { name: BsProjector, title: "projector" },
  { name: FaWifi, title: "wifi" },
];

const toFR = {
  university: "uni",
  library: "biblio",
  coffee: "café",
  nature: "nature",
  laboratory: "labo",
  screen: "écran",
  whiteboard: "tableau",
  plug: "prise",
  projector: "projecteur",
  wifi: "wifi",
};

const toEN = {
  uni: "university",
  biblio: "library",
  café: "coffee",
  nature: "nature",
  labo: "laboratory",
  musique: "music",
  écran: "screen",
  tableau: "whiteboard",
  prise: "plug",
  projecteur: "projector",
  wifi: "wifi",
};

export default function FiltersIcons({ onIconFiltersUpdate }) {
  const [iconFilters, setIconFilters] = useState([]);
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

  useEffect(() => {
    onIconFiltersUpdate(iconFilters);
  }, [iconFilters]);

  return (
    <div className="m-3">
      <ul className="flex w-[900px] gap-2">
        {icons.map((icon, index) => {
          const IconComponent = icon.name;
          return (
            <li
              className={`filter_icons flex flex-col flex-1 items-center gap-1 opacity-70 py-4 rounded-full transition hover:rounded-full hover:transition hover:bg-[#cccccc]
              ${iconFilters.indexOf(icon.title) !== -1 ? "bg-[#cccccc]" : ""}`}
              key={index}
              onClick={handleIconClick}
            >
              <IconComponent className="size-6" />
              <p className="text-xs filter_icons_text">{toFR[icon.title]}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
