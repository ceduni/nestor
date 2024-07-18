import React, { useEffect, useState } from "react";

export default function NameDropDown({
  allNames,
  filters,
  setFilters,
  hasClickedOutsideName,
  setIsNameDropDownClicked,
  isNameDropDownClicked,
}) {
  const [filteredNames, setFilteredNames] = useState([]);

  function customSort(a, b) {}

  useEffect(() => {
    const temp = [];
    allNames.forEach((name) => {
      let exists = temp.some((item) => {
        return item === name.organisation;
      });
      if (
        !exists &&
        name.organisation
          .toLowerCase()
          .includes(filters.name.toLowerCase().trim())
      ) {
        temp.push(name.organisation);
      }
      exists = temp.some((item) => item === name.library);
      if (
        !exists &&
        name.library &&
        name.library.toLowerCase().includes(filters.name.toLowerCase().trim())
      ) {
        temp.push(name.library);
      }
      if (name.name.toLowerCase().includes(filters.name.toLowerCase().trim())) {
        temp.push(name.name);
      }
    });
    setFilteredNames(temp);
  }, [filters.name]);

  const handleItemClick = (e) => {
    setIsNameDropDownClicked(true);
    setFilters({ ...filters, name: e.target.textContent });
  };

  return (
    <div
      id="dropdown"
      className={`right-[650px] z-10 top-[72px] p-3 gap-5 flex flex-col bg-white shadow absolute rounded-lg border w-80 ${
        !filters.name.trim() ||
        filteredNames.length === 0 ||
        hasClickedOutsideName ||
        isNameDropDownClicked
          ? "invisible"
          : ""
      }`}
    >
      {[]
        .concat(filteredNames)
        .sort(customSort)
        .slice(0, 5)
        .map((name, index) => (
          <div
            key={index}
            className="text-md hover:font-semibold hover:transition-[font-weight] hover:duration-300"
            onClick={handleItemClick}
          >
            {name}
          </div>
        ))}
    </div>
  );
}
