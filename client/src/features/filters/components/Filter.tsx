import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarDay } from "react-icons/fa";
import { LuSchool2 } from "react-icons/lu";
import { IoLibraryOutline } from "react-icons/io5";
import { FiCoffee } from "react-icons/fi";
import { LuTreeDeciduous } from "react-icons/lu";
import { PiMicroscope } from "react-icons/pi";
import { PiMonitor } from "react-icons/pi";
import { TfiBlackboard } from "react-icons/tfi";
import { PiPlug } from "react-icons/pi";
import { LuProjector } from "react-icons/lu";
import { FaWifi } from "react-icons/fa";
import NameFilterDropDown from "./NameFilterDropDown.tsx";
import {useSpaces} from "../../../hooks/useSpaces.ts";
import {createContext, useState} from "react";
import {FilterParams, Space} from "../types.ts";
import {useDidUpdateEffect} from "../../../hooks/useDidUpdateEffect.ts";

export const SpaceContext = createContext<Space[] | undefined>([]);
export default function Filter() {
    const [filterParams, setFilterParams] = useState<FilterParams>({
        name: "",
        address: "",
        date: "",
        capacity: ""
    })
    // this is the culprit !!
    const {spaces, isLoading, setQueryParams} = useSpaces();
    useDidUpdateEffect(useSpaces, [filterParams]);

    return (
        <section className="filter-section">
            <div className="filter-container">
                <form className="filter-bar-container" >
                    <div className="filter-bar-item">
                        <div className="filter-bar-item-label">
                            <label htmlFor="name">Nom</label>
                        </div>
                        <div className="filter-bar-item-input">
                            <input type="text" id="name" name="name" placeholder="Entrer un non d'espace"/>
                        </div>
                        <SpaceContext.Provider value={spaces}>
                            <NameFilterDropDown/>
                        </SpaceContext.Provider>
                    </div>
                    <div className="filter-bar-item">
                        <div className="filter-bar-item-label">
                            <FaLocationDot />
                            <label htmlFor="address">Adresse</label>
                        </div>
                        <div className="filter-bar-item-input">
                            <input type="text" id="address" name="address" placeholder="Entrer une adresse"/>
                        </div>
                    </div>
                    <div className="filter-bar-item">
                        <div className="filter-bar-item-label">
                            <FaCalendarDay />
                            <label htmlFor="date">Date</label>
                        </div>
                        <div className="filter-bar-item-input">
                            <input type="text" id="date" name="date" placeholder="Entrer une date"/>
                        </div>
                    </div>
                    <div className="filter-bar-item">
                        <div className="filter-bar-item-label">
                            <label htmlFor="capacity">Capacité</label>
                        </div>
                        <div className="filter-bar-item-input">
                            <input type="number" id="capacity" name="capacity" placeholder="Entrer une capacité"/>
                        </div>
                    </div>
                    <input type="submit" id="filter-search-button" value="Rechercher"/>
                </form>
                <div className="filter-icons-container">
                    <div className="filter-icons-item">
                        <LuSchool2 />
                        <div>uni</div>
                    </div>
                    <div className="filter-icons-item">
                        <IoLibraryOutline/>
                        <div>biblio</div>
                    </div>
                    <div className="filter-icons-item">
                        <FiCoffee/>
                        <div>café</div>
                    </div>
                    <div className="filter-icons-item">
                        <LuTreeDeciduous/>
                        <div>nature</div>
                    </div>
                    <div className="filter-icons-item">
                        <PiMicroscope/>
                        <div>labo</div>
                    </div>
                    <div className="filter-icons-item">
                        <PiMonitor/>
                        <div>écran</div>
                    </div>
                    <div className="filter-icons-item">
                        <TfiBlackboard />
                        <div>tableau</div>
                    </div>
                    <div className="filter-icons-item">
                        <PiPlug />
                        <div>prise</div>
                    </div>
                    <div className="filter-icons-item">
                        <LuProjector />
                        <div>projecteur</div>
                    </div>
                    <div className="filter-icons-item">
                        <FaWifi />
                        <div>wifi</div>
                    </div>
                </div>
            </div>
        </section>
    )
}