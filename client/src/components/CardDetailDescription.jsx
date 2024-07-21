import React from "react";
import { CgOrganisation } from "react-icons/cg";
import {
  MdOutlineSubtitles,
  MdOutlineDescription,
  MdOutlinePark,
} from "react-icons/md";
import { CiLocationOn, CiMusicNote1 } from "react-icons/ci";
import { IoLibraryOutline, IoPeopleOutline } from "react-icons/io5";
import { LuMicroscope, LuSchool2 } from "react-icons/lu";
import { VscCoffee } from "react-icons/vsc";
import { SlScreenDesktop } from "react-icons/sl";
import { TfiBlackboard } from "react-icons/tfi";
import { BsPlug, BsProjector } from "react-icons/bs";
import { FaWifi } from "react-icons/fa6";
import { FaAccessibleIcon } from "react-icons/fa";

export default function CardDetailDescription({ spaceDetail }) {
  const icons = {
    university: LuSchool2,
    library: IoLibraryOutline,
    coffee: VscCoffee,
    nature: MdOutlinePark,
    laboratory: LuMicroscope,
    music: CiMusicNote1,
    screen: SlScreenDesktop,
    whiteboard: TfiBlackboard,
    plug: BsPlug,
    projector: BsProjector,
    wifi: FaWifi,
    accessible: FaAccessibleIcon,
  };

  const toFR = {
    university: "uni",
    library: "biblio",
    coffee: "café",
    nature: "nature",
    laboratory: "labo",
    music: "musique",
    screen: "écran",
    whiteboard: "tableau",
    plug: "prise",
    projector: "projecteur",
    wifi: "wifi",
    accessible: "accessible",
  };
  return (
    <div className="flex flex-col gap-2">
      <ul className="p-4 flex flex-col gap-4 text-lg">
        <li className="font-bold flex gap-2">
          <MdOutlineSubtitles className="mt-1" />
          {spaceDetail.name}
        </li>
        <li className="flex gap-2">
          <CgOrganisation className="mt-1" />
          {spaceDetail.organisation}
        </li>
        <li className="flex gap-2">
          <CiLocationOn className="mt-1" />
          {`${spaceDetail.street},`}
          <br />
          {`${spaceDetail.city}, ${spaceDetail.state} ${spaceDetail.postalCode}`}
        </li>

        <li className="flex gap-2">
          <IoPeopleOutline className="mt-1" />
          {spaceDetail.capacity} personnes
        </li>
        <li className="flex gap-2 bg-[#ebedee] rounded-lg p-2">
          <MdOutlineDescription className="mt-1" />
          <p className="w-[600px] text-justify">{spaceDetail.description}</p>
        </li>
      </ul>
      <div className="grid grid-cols-2 text-lg p-4">
        {spaceDetail.features.map((equip, index) => {
          const IconComponent = icons[equip];
          return (
            <div className="flex gap-2" key={index}>
              <IconComponent className="mt-1" />
              {toFR[equip]}
            </div>
          );
        })}
      </div>
    </div>
  );
}
