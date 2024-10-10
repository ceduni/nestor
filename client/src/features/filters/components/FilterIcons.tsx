import {
    LuProjector,
    LuSchool2,
    LuTreeDeciduous
} from "react-icons/lu";
import { IoLibraryOutline } from "react-icons/io5";
import { FiCoffee } from "react-icons/fi";
import { PiMicroscope, PiMonitor, PiPlug } from "react-icons/pi";
import { TfiBlackboard } from "react-icons/tfi";
import { FaWifi } from "react-icons/fa";
import { useState } from "react";

const iconData = [
    { Icon: LuSchool2, label: "uni" },
    { Icon: IoLibraryOutline, label: "biblio" },
    { Icon: FiCoffee, label: "café" },
    { Icon: LuTreeDeciduous, label: "nature" },
    { Icon: PiMicroscope, label: "labo" },
    { Icon: PiMonitor, label: "écran" },
    { Icon: TfiBlackboard, label: "tableau" },
    { Icon: PiPlug, label: "prise" },
    { Icon: LuProjector, label: "projecteur" },
    { Icon: FaWifi, label: "wifi" }
];

export default function FilterIcons({ setQueryParams }) {
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

    const handleIconClick = (label: string) => {
        setSelectedLabel(label);
    }

    return (
        <div className="filter-icons-container">
            {iconData.map(({ Icon, label }, index) => (
                <div
                    key={index}
                    className={`filter-icons-item ${selectedLabel === label ? 'icon-focus' : ''}`}
                    onClick={() => handleIconClick(label)}
                >
                    <Icon />
                    <div>{label}</div>
                </div>
            ))}
        </div>
    );
}
