import React, { useEffect, useRef, useState } from "react";
import { IoSearchCircle } from "react-icons/io5";
import FiltersIcons from "./FiltersIcons";
import AddressDropDown from "./AddressDropDown.jsx";
import { startOfToday } from "date-fns";
import DatePicker from "./DatePicker.jsx";
import NameDropDown from "./NameDropDown.jsx";

export default function Filters({
  onFiltersUpdate,
  allAddresses,
  allNames,
  onIconFiltersUpdate,
}) {
  const [filterBtnCliked, setFilterBtnClicked] = useState(false);
  const [hasAnyFilter, setHasAnyFilter] = useState(false);
  const [hasClickedOutsideAddress, setHasClickedOutsideAddress] =
    useState(false);
  const [hasClickedOutsideDate, setHasClickedOutsideDate] = useState(false);
  const [hasClickedOutsideName, setHasClickedOutsideName] = useState(false);
  const [isDateClicked, setIsDateClicked] = useState(false);
  const [isDateItemClicked, setIsDateItemClicked] = useState(false);
  const [isNameDropDownClicked, setIsNameDropDownClicked] = useState(false);
  const [filterTags, setFilterTags] = useState([]);
  const currentDate = startOfToday();
  const addressRef = useRef(null);
  const dateRef = useRef(null);
  const nameRef = useRef(null);
  const [filters, setFilters] = useState({
    name: "",
    address: "",
    peopleNum: 0,
    date: "",
  });

  useEffect(() => {
    if (filterTags.length === 0) {
      setHasAnyFilter(false);
    } else {
      setHasAnyFilter(true);
    }
  }, [filterTags]);

  const handleClick = (e) => {
    e.preventDefault();
    setFilterBtnClicked(!filterBtnCliked);
  };

  const handleNameChange = (e) => {
    setFilters({
      ...filters,
      name: e.target.value,
    });
  };

  const handleAddressChange = (e) => {
    setFilters({
      ...filters,
      address: e.target.value,
    });
  };

  const handleAddressClick = () => {
    setHasClickedOutsideAddress(false);
  };

  const handleNameClick = () => {
    setHasClickedOutsideName(false);
    setIsNameDropDownClicked(false);
  };

  const handlePeopleNumChange = (e) => {
    setFilters({
      ...filters,
      peopleNum: e.target.value,
    });
  };

  const handleDateClick = () => {
    setHasClickedOutsideDate(false);
    setIsDateClicked(!isDateClicked);
    setIsDateItemClicked(false);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const filterValues = Object.values(filters);
    const tags = filterValues.filter((val) => val !== "" && val !== 0);
    setFilterTags(tags);
    onFiltersUpdate(
      filters.name.trim(),
      filters.address.trim(),
      filters.peopleNum,
      filters.date,
    );
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (addressRef.current && !addressRef.current.contains(event.target)) {
        setHasClickedOutsideAddress(true);
      }
      if (dateRef.current && !dateRef.current.contains(event.target)) {
        setHasClickedOutsideDate(true);
      }
      if (nameRef.current && !nameRef.current.contains(event.target)) {
        setHasClickedOutsideName(true);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [addressRef, dateRef, nameRef]);

  return (
    <div className="filter_section flex flex-col items-center z-8 bg-white">
      <form
        className="relative filter_form flex justify-center rounded-full px-8 m-3 shadow"
        action=""
        onSubmit={handleFilterSubmit}
      >
        <div
          className="filter_form_items flex flex-col gap-x-5 items-start"
          ref={nameRef}
        >
          <label className="filter_label text-base" htmlFor="filter_nom_espace">
            Nom
          </label>
          <input
            className="filter_input text-base"
            id="filter_nom_espace"
            type="text"
            value={filters.name}
            placeholder="Entrer un nom"
            onChange={handleNameChange}
            onClick={handleNameClick}
          />
          <NameDropDown
            allNames={allNames}
            filters={filters}
            setFilters={setFilters}
            hasClickedOutsideName={hasClickedOutsideName}
            setIsNameDropDownClicked={setIsNameDropDownClicked}
            isNameDropDownClicked={isNameDropDownClicked}
          />
        </div>
        <div
          className="filter_form_items flex flex-col items-start"
          ref={addressRef}
        >
          <label className="filter_label text-base" htmlFor="filter_addresse">
            Adresse
          </label>
          <input
            className="filter_input text-base"
            id="filter_addresse"
            type="text"
            placeholder="Entrer une adresse"
            value={filters.address}
            onChange={handleAddressChange}
            onClick={handleAddressClick}
          />
          <AddressDropDown
            allAddresses={allAddresses}
            filters={filters}
            setFilters={setFilters}
            hasClickedOutsideAddress={hasClickedOutsideAddress}
          />
        </div>
        <div className="filter_form_items flex flex-col items-start">
          <label className="filter_label text-base" htmlFor="filter_addresse">
            Capacité
          </label>
          <input
            className="filter_input text-base"
            id="filter_nb_personnes"
            type="number"
            placeholder="Entrer un nombre"
            onChange={handlePeopleNumChange}
          />
        </div>
        <div
          className="filter_form_items flex flex-col items-start"
          ref={dateRef}
        >
          <div>
            <label className="filter_label" htmlFor="">
              Date
            </label>
            <input
              type="text"
              placeholder={currentDate.toISOString().split("T")[0]}
              className="filter_input caret-transparent"
              value={filters.date}
              onChange={() => {}}
              onClick={handleDateClick}
            />
          </div>
          <DatePicker
            filters={filters}
            setFilters={setFilters}
            hasClickedOutsideDate={hasClickedOutsideDate}
            isDateClicked={isDateClicked}
            setIsDateClicked={setIsDateClicked}
            setIsDateItemClicked={setIsDateItemClicked}
            isDateItemClicked={isDateItemClicked}
          />
        </div>
        <div className="filter_form_btn flex justify-center items-center px-2">
          <button className="filter_form_btn_link">
            <IoSearchCircle className="filter_search_icon color-red size-12" />
          </button>
        </div>
      </form>
      <FiltersIcons onIconFiltersUpdate={onIconFiltersUpdate} />
    </div>
  );
}
