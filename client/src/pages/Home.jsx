import React, { useEffect, useState } from "react";
import Filters from "../components/Filters";
import Cards from "../components/Cards";

export default function Home() {
  const [filters, setFilters] = useState({
    name: "",
    address: "",
    peopleNum: 0,
    date: "",
  });
  const [allAddresses, setAllAddresses] = useState([]);
  const [allNames, setAllNames] = useState([]);
  const [featureFilters, setFeatureFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([])
  const [allSpaces, setAllSpaces] = useState([]);

  useEffect(() => {
    fetchAllSpaces();
  }, []);
  const fetchAllSpaces = () => {
    fetch("http://localhost:3000/api/v1/spaces/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAllSpaces(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const addresses = [];
    const names = [];
    allSpaces.forEach((space) => {
      const exists = addresses.some(
        (item) =>
          item.city === space.city &&
          item.state === space.state &&
          item.street === space.street,
      );
      if (!exists) {
        addresses.push({
          street: space.street,
          city: space.city,
          state: space.state,
        });
      }
    });
    allSpaces.forEach((space) => {
      names.push({
        name: space.name,
        library: space.library,
        organisation: space.organisation,
      });
    });
    setAllAddresses(addresses);
    setAllNames(names);
  }, [allSpaces]);

  const handleFilters = (newName, newAddress, newPeopleNum, newDate) => {
    setFilters({
      ...filters,
      name: newName,
      address: newAddress,
      peopleNum: newPeopleNum,
      date: newDate,
    });
  };

  return (
    <main className="">
      <section className="filters p-1 bg-white z-9 top-16">
        <Filters
          onFiltersUpdate={handleFilters}
          onFeatureFiltersUpdate={setFeatureFilters}
          onCategoryFiltersUpdate={setCategoryFilters}
          allAddresses={allAddresses}
          allNames={allNames}
        />
      </section>
      <section className="">
        <Cards
          allSpaces={allSpaces}
          filters={filters}
          featureFilters={featureFilters}
          categoryFilters={categoryFilters}
        />
      </section>
    </main>
  );
}
