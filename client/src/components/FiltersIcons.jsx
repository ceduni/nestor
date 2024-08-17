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

const features = [
  { name: SlScreenDesktop, title: "screen" },
  { name: TfiBlackboard, title: "whiteboard" },
  { name: BsPlug, title: "plug" },
  { name: BsProjector, title: "projector" },
  { name: FaWifi, title: "wifi" },
];

const categories = [
  { name: LuSchool2, title: "university" },
  { name: IoLibraryOutline, title: "library" },
  { name: VscCoffee, title: "coffee" },
  { name: MdOutlinePark, title: "nature" },
  { name: LuMicroscope, title: "laboratory" },
]

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

export default function FiltersIcons({ onFeatureFiltersUpdate, onCategoryFiltersUpdate }) {
  const [featureFilters, setFeatureFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const handleFeatureClick = (e) => {
    e.preventDefault();
    const featureFilter =
      toEN[e.currentTarget.querySelector(".filter_features_text").textContent];
    if (featureFilters.indexOf(featureFilter) !== -1) {
      setFeatureFilters(featureFilters.filter((feature) => feature !== featureFilter));
    } else {
      setFeatureFilters([...featureFilters, featureFilter]);
    }
  };

  const handleCategoryClick = (e) => {
    e.preventDefault();
    const categoryFilter =
        toEN[e.currentTarget.querySelector(".filter_categories_text").textContent];
    if (categoryFilters.indexOf(categoryFilter) !== -1) {
      setCategoryFilters(categoryFilters.filter((category) => category !== categoryFilter));
    } else {
      setCategoryFilters([...categoryFilters, categoryFilter]);
    }
  }

  useEffect(() => {
    onFeatureFiltersUpdate(featureFilters);
    onCategoryFiltersUpdate(categoryFilters);
  }, [featureFilters, categoryFilters]);

  return (
    <div className="">
      <ul className="flex w-[900px] gap-x-2">
        {features.map((feature, index) => {
          const IconComponent = feature.name;
          return (
            <li
              className={`filter_icons flex flex-col flex-1 items-center gap-1 opacity-70 py-3 rounded-xl transition hover:rounded-xl hover:transition hover:bg-[#cccccc]
              ${featureFilters.indexOf(feature.title) !== -1 ? "bg-[#cccccc]" : ""}`}
              key={index}
              onClick={handleFeatureClick}
            >
              <IconComponent className="size-6" />
              <p className="text-xs filter_features_text">{toFR[feature.title]}</p>
            </li>
          );
        })}
        {categories.map((category, index) => {
          const IconComponent = category.name;
          return (
              <li
                  className={`filter_icons flex flex-col flex-1 items-center gap-1 opacity-70 py-3 rounded-xl transition hover:rounded-xl hover:transition hover:bg-[#cccccc]
              ${categoryFilters.indexOf(category.title) !== -1 ? "bg-[#cccccc]" : ""}`}
                  key={index}
                  onClick={handleCategoryClick}
              >
                <IconComponent className="size-6" />
                <p className="text-xs filter_categories_text">{toFR[category.title]}</p>
              </li>
          );
        })}
      </ul>
    </div>
  );
}
