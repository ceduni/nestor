import React, { useEffect, useState } from "react";
import Filters from "../components/Filters";
import Cards from "../components/Cards";
import { useQuery } from "@tanstack/react-query";
import { getSpaces } from "../apis/spaces-api";
import { all } from "axios";

export default function Home() {
  const [filters, setFilters] = useState({
    name: "",
    address: "",
    peopleNum: 0,
    date: "",
  });
  const [allAddresses, setAllAddresses] = useState([]);
  const [allNames, setAllNames] = useState([]);
  const [iconFilters, setIconFilters] = useState([]);
  const [allSpaces, setAllSpaces] = useState([]);

  // const {data:allSpaces, error, isLoading} = useQuery({
  //     queryKey : ['spaces'],
  //     queryFn : getSpaces,
  //     staleTime: 1000 * 60 * 2,
  // });

  // console.log(getSpaces);
  // console.log('allSpaces:', allSpaces);
  // console.log('error:', error);
  // console.log('isLoading:', isLoading);

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
    <main className=''>
      <section className="filters overflow-hidden p-1 sticky bg-white z-9 top-16">
        <Filters
          onFiltersUpdate={handleFilters}
          onIconFiltersUpdate={setIconFilters}
          allAddresses={allAddresses}
          allNames={allNames}
        />
      </section>
      <section className='z-0'>
        <Cards
          allSpaces={allSpaces}
          filters={filters}
          iconFilters={iconFilters}
        />
      </section>
    </main>
  );
}
