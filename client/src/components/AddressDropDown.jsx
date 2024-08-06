import React, { useEffect, useState } from "react";
export default function AddressDropDown({
  allAddresses,
  filters,
  setFilters,
  hasClickedOutsideAddress,
}) {
  const [filteredAddresses, setFilteredAddresses] = useState([]);

  // Custom sorting function
  function customSort(a, b) {
    if (a.street > b.street) {
      return 1;
    } else if (a.street < b.street) {
      return -1;
    } else {
      if (a.city > b.city) {
        return 1;
      } else if (a.city > b.city) {
        return -1;
      } else {
        if (a.state > b.state) {
          return 1;
        } else if (a.state > b.state) {
          return -1;
        } else {
          return 0;
        }
      }
    }
  }

  useEffect(() => {
    const temp = [];
    allAddresses.forEach((address) => {
      const exists = temp.some(
        (item) => item.city === address.city && item.state === address.state,
      );
      if (
        !exists &&
        (address.city
          .toLowerCase()
          .includes(filters.address.toLowerCase().trim()) ||
          address.state
            .toLowerCase()
            .includes(filters.address.toLowerCase().trim()))
      ) {
        temp.push({
          street: "",
          city: address.city,
          state: address.state,
        });
      }
      if (
        address.state
          .toLowerCase()
          .includes(filters.address.toLowerCase().trim()) ||
        address.city
          .toLowerCase()
          .includes(filters.address.toLowerCase().trim()) ||
        address.street
          .toLowerCase()
          .includes(filters.address.toLowerCase().trim())
      ) {
        temp.push({
          street: address.street,
          city: address.city,
          state: address.state,
        });
      }
    });
    setFilteredAddresses(temp);
  }, [filters.address]);

  const handleItemClick = (e) => {
    setFilters({ ...filters, address: e.target.textContent });
  };

  return (
    <div
      id="dropdown"
      className={`right-[445px] z-10 top-[72px] p-3 gap-4 flex flex-col bg-white absolute shadow rounded-lg border w-80 ${
        !filters.address.trim() ||
        filteredAddresses.length === 0 ||
        hasClickedOutsideAddress
          ? "invisible"
          : ""
      }`}
    >
      {[]
        .concat(filteredAddresses)
        .sort(customSort)
        .slice(0, 5)
        .map((address, index) => (
          <div
            key={index}
            className="text-md hover:font-semibold hover:transition-[font-weight] hover:duration-300"
            onClick={handleItemClick}
          >
            {`${address.street ? `${address.street}, ` : ""}${address.city}, ${address.state}`}
          </div>
        ))}
    </div>
  );
}
