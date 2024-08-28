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
import { ChangeEvent, createContext, useEffect, useState } from "react";
import { FilterParams, Location } from "../types.ts";
import AddressDropDownSkeleton from "./AddressDropDownSkeleton.tsx";
import { useLocations } from "../hooks/useLocations.ts";
import { useAddress } from "../hooks/useAddress.ts";
import { useSpaces } from "../hooks/useSpaces.ts";

export default function Filter() {
  const [filterParams, setFilterParams] = useState<FilterParams>();
  const {
    processedLocations,
    isLoading: isLocationLoading,
    addressFilter,
    setAddressFilter,
    handleAddressChange,
    showAddressDropDown,
    setShowAddressDropDown,
  } = useAddress();

  const [{ data: spaces, isLoading: isSpaceLoading }, setQueryParams] =
    useSpaces();

  const [date, setDate] = useState<Date>(new Date());

  const [capacity, setCapacity] = useState(1);
  const handleCapacityChange = (event) => {
    setCapacity(event.target.value);
  };

  const handleSearchButtonClick = () => {
    setQueryParams((prevQueryParams) => ({
      filters: {
        date: date.toISOString(),
        address: addressFilter,
        capacity: capacity.toString(),
      },
      pagination: {
        limit: "5",
        page: prevQueryParams.pagination?.page.toString(),
      },
    }));
  };

  return (
    <section className="filter-section">
      <div className="filter-container">
        <form className="filter-bar-container">
          <div className="filter-bar-item">
            <div className="filter-bar-item-label">
              <FaLocationDot />
              <label htmlFor="address">Adresse</label>
            </div>
            <div className="filter-bar-item-input">
              <input
                type="search"
                id="address"
                name="address"
                placeholder="Entrer une adresse"
                value={addressFilter}
                onChange={(event) => handleAddressChange(event)}
              />
            </div>
            {isLocationLoading && <AddressDropDownSkeleton />}
            {showAddressDropDown &&
              addressFilter &&
              processedLocations.length !== 0 && (
                <AddressDropDown
                  locations={processedLocations}
                  setAddressFilter={setAddressFilter}
                  setShowAddressDropDown={setShowAddressDropDown}
                />
              )}
          </div>
          <div className="filter-bar-item">
            <div className="filter-bar-item-label">
              <FaCalendarDay />
              <label htmlFor="date">Date</label>
            </div>
            <div className="filter-bar-item-input">
              <input
                type="text"
                id="date"
                name="date"
                placeholder="Entrer une date"
              />
            </div>
          </div>
          <div className="filter-bar-item">
            <div className="filter-bar-item-label">
              <label htmlFor="capacity">Capacité</label>
            </div>
            <div className="filter-bar-item-input">
              <input
                type="number"
                id="capacity"
                name="capacity"
                placeholder="Entrer une capacité"
                onChange={(event) => {
                  handleCapacityChange(event);
                }}
              />
            </div>
          </div>
          <input
            type="submit"
            id="filter-search-button"
            value="Rechercher"
            onClick={handleSearchButtonClick}
          />
        </form>
        <div className="filter-icons-container">
          <div className="filter-icons-item">
            <LuSchool2 />
            <div>uni</div>
          </div>
          <div className="filter-icons-item">
            <IoLibraryOutline />
            <div>biblio</div>
          </div>
          <div className="filter-icons-item">
            <FiCoffee />
            <div>café</div>
          </div>
          <div className="filter-icons-item">
            <LuTreeDeciduous />
            <div>nature</div>
          </div>
          <div className="filter-icons-item">
            <PiMicroscope />
            <div>labo</div>
          </div>
          <div className="filter-icons-item">
            <PiMonitor />
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
  );
}
