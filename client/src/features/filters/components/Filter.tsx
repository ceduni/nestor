import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarDay } from "react-icons/fa";
import AddressDropDown from "./AddressDropDown.tsx";
import { useEffect, useRef, useState } from "react";
import AddressDropDownSkeleton from "./AddressDropDownSkeleton.tsx";
import { useAddress } from "../hooks/useAddress.ts";
import FilterIcons from "./FilterIcons.tsx";
import { QueryParams } from "../types.ts";
import DatePicker from "./DatePicker.tsx";
import { format } from "date-fns";
import { useClickOutside } from "../hooks/useClickOutside.ts";
import FilterTags from "./FilterTags.tsx";
import { useFilter } from "../hooks/useFilter.ts";

export default function Filter({ queryParams, setQueryParams }) {
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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleDateClick = () => {
    setShowDatePicker((prevState) => !prevState);
  };

  const [capacity, setCapacity] = useState(1);
  const handleCapacityChange = (event) => {
    setCapacity(event.target.value);
  };

  const { handleIconClick, handleCancelButtonClick, features, tags } =
    useFilter(setQueryParams, queryParams, setAddressFilter, setCapacity);

  const dropDownRef = useRef(null);

  useClickOutside(dropDownRef, () => {
    setShowDatePicker(false);
    setShowAddressDropDown(false);
  });

  const handleSearchButtonClick = () => {
    setShowAddressDropDown(false);
    setQueryParams((prevQueryParams: QueryParams) => ({
      ...prevQueryParams,
      filters: {
        ...prevQueryParams.filters,
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
                  dropDownRef={dropDownRef}
                />
              )}
          </div>
          <div className="filter-bar-item" ref={dropDownRef}>
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
                value={format(date, "yyyy-MM-dd")}
                onClick={handleDateClick}
                onChange={() => {}}
              />
            </div>
            {showDatePicker && (
              <DatePicker
                setDate={setDate}
                setShowDatePicker={setShowDatePicker}
              />
            )}
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
                value={capacity}
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
        <FilterIcons handleIconClick={handleIconClick} features={features} />
      </div>
      <FilterTags
        handleCancelButtonClick={handleCancelButtonClick}
        tags={tags}
      />
    </section>
  );
}
