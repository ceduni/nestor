import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarDay } from "react-icons/fa";
import AddressDropDown from "./AddressDropDown.tsx";
import { useState } from "react";
import AddressDropDownSkeleton from "./AddressDropDownSkeleton.tsx";
import { useAddress } from "../hooks/useAddress.ts";
import FilterIcons from "./FilterIcons.tsx";
import { QueryParams } from "../types.ts";

export default function Filter({ setQueryParams }) {
  const {
    processedLocations,
    isLoading: isLocationLoading,
    addressFilter,
    setAddressFilter,
    handleAddressChange,
    showAddressDropDown,
    setShowAddressDropDown,
  } = useAddress();

  const [date, setDate] = useState<Date>(new Date());

  const [capacity, setCapacity] = useState(1);
  const handleCapacityChange = (event) => {
    setCapacity(event.target.value);
  };

  const handleSearchButtonClick = () => {
    setShowAddressDropDown(false);
    setQueryParams((prevQueryParams: QueryParams) => ({
      ...prevQueryParams,
      filters: {
        date: date.toISOString(),
        address: addressFilter,
        capacity: capacity.toString(),
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
              processedLocations &&
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
                min="1"
                id="capacity"
                name="capacity"
                placeholder="Entrer une capacité"
                onChange={(event) => {
                  handleCapacityChange(event);
                }}
              />
            </div>
          </div>
          <div onClick={handleSearchButtonClick} id="filter-search-button">
            Rechercher
          </div>
        </form>
        <FilterIcons setQueryParams={setQueryParams} />
      </div>
    </section>
  );
}
