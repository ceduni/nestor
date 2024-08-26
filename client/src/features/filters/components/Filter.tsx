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
import AddressDropDown from "./AddressDropDown.tsx";
import {ChangeEvent, createContext, useEffect, useState} from "react";
import {FilterParams, Location} from "../types.ts";
import AddressDropDownSkeleton from "./AddressDropDownSkeleton.tsx";
import {useLocations} from "../hooks/useLocations.ts";

export const FilterContext = createContext({});
export default function Filter() {
    const [filterParams, setFilterParams] = useState<FilterParams>()
    const [{data: locations, isLoading},setQueryParams] = useLocations();
    const [processedLocations, setProcessedLocations] = useState<Location[]>([]);
    const [addressFilter, setAddressFilter] = useState("");
    const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        const addressFilter = event.target.value;
        if(addressFilter) {
            setQueryParams(prevQueryParams => ({
                ...prevQueryParams,
                filters: {
                    address: addressFilter
                }
            }));
        }
        setAddressFilter(addressFilter);
    }

    useEffect(() => {
        setProcessedLocations([]);
        locations?.forEach(location => {
            if(location.streetNumber.startsWith(addressFilter.trim())) {
                setProcessedLocations(prevProcessedLocations => [...prevProcessedLocations, location]);
            }
            if(location.streetName.toLowerCase().startsWith(addressFilter.trim().toLowerCase())) {
                setProcessedLocations(prevProcessedLocations => [...prevProcessedLocations, {
                    id: location.id,
                    streetNumber: "",
                    streetName: location.streetName,
                    city: location.city,
                    state: location.state,
                    country: location.country,
                    postalCode: location.postalCode,
                }]);
            }
            if(location.city.toLowerCase().startsWith(addressFilter.trim().toLowerCase())) {
                setProcessedLocations(prevProcessedLocations => [...prevProcessedLocations, {
                    id: location.id,
                    streetNumber: "",
                    streetName: "",
                    city: location.city,
                    state: location.state,
                    country: location.country,
                    postalCode: location.postalCode,
                }]);
            }
            if(location.state.toLowerCase().startsWith(addressFilter.trim().toLowerCase())) {
                setProcessedLocations(prevProcessedLocations => [...prevProcessedLocations, {
                    id: location.id,
                    streetNumber: "",
                    streetName: "",
                    city: "",
                    state: location.state,
                    country: location.country,
                    postalCode: location.postalCode,
                }]);
            }
        })
    }, [locations]);

    return (
        <section className="filter-section">
            <div className="filter-container">
                <form className="filter-bar-container" >
                    <div className="filter-bar-item">
                        <div className="filter-bar-item-label">
                            <FaLocationDot />
                            <label htmlFor="address">Adresse</label>
                        </div>
                        <div className="filter-bar-item-input">
                            <input type="search" id="address" name="address" placeholder="Entrer une adresse" onChange={(event) => handleAddressChange(event)}/>
                        </div>
                        {isLoading && <AddressDropDownSkeleton/>}
                        {addressFilter && processedLocations.length !== 0 && <AddressDropDown locations={processedLocations}/>}
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