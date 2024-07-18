import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card";
import CardDetail from "./CardDetail";
import { LuRefreshCw } from "react-icons/lu";

export default function Cards({ allSpaces, filters, iconFilters }) {
  // States
  const [cardSelected, setCardSelected] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const [detailSelected, setDetailSelected] = useState({});
  const [onlyCards, setOnlyCards] = useState(false);

  // effects
  useEffect(() => {
    setSpaces(allSpaces);
  }, [allSpaces]);

  useEffect(() => {
    filtering(filters);
  }, [filters, iconFilters]);

  const filtering = (filters) => {
    let filteredSpaces = [...allSpaces];

    const addressParts = filters.address.split(",");
    if (addressParts.length === 2) {
      const [city, state] = addressParts;
      filteredSpaces = filteredSpaces.filter(
        (space) =>
          space.city.toLowerCase().includes(city.toLowerCase().trim()) &&
          space.state.toLowerCase().includes(state.toLowerCase().trim()),
      );
    } else if (addressParts.length === 3) {
      const [street, city, state] = addressParts;
      filteredSpaces = filteredSpaces.filter(
        (space) =>
          space.street.toLowerCase().includes(street.toLowerCase().trim()) &&
          space.city.toLowerCase().includes(city.toLowerCase().trim()) &&
          space.state.toLowerCase().includes(state.toLowerCase().trim()),
      );
    }
    filteredSpaces = filteredSpaces.filter((space) =>
      space.availabilities.some((avail) =>
        avail.startAt.includes(filters.date),
      ),
    );
    console.log(filters.date)
    filteredSpaces = filteredSpaces.filter(
      (space) =>
        Number(filters.peopleNum) === 0 ||
        space.capacity === Number(filters.peopleNum),
    );
    filteredSpaces = filteredSpaces.filter(
      (space) =>
        space.organisation
          .toLowerCase()
          .includes(filters.name.toLowerCase().trim()) ||
        (space.library &&
          space.library
            .toLowerCase()
            .includes(filters.name.toLowerCase().trim())) ||
        space.name.toLowerCase().includes(filters.name.toLowerCase().trim()),
    );
    if (iconFilters.length !== 0) {
      filteredSpaces = filteredSpaces.filter(
        (space) =>
          iconFilters.includes(space.type) ||
          iconFilters.every((iconFilter) =>
            space.features.includes(iconFilter),
          ),
      );
    }

    setSpaces(filteredSpaces);
  };

  // Handles
  const handleCardClick = (isClicked, space) => {
    if (isClicked) {
      handleSelectSpaceDetail(space);
    } else {
      setCardSelected(!isClicked);
      handleSelectSpaceDetail(space);
    }
  };

  const handleSelectSpaceDetail = (space) => {
    const spaceSelected = spaces.find((sp) => sp.name === space.name);
    setDetailSelected(spaceSelected);
  };

  const handleRefreshClick = (e) => {
    e.preventDefault();
    setCardSelected(false);
    setDetailSelected({});
    console.log(cardSelected);
    console.log(detailSelected);
  };

  return (
    <div className='my-5'>
      <div className="flex justify-center items-center">
        <p className="text-center p-3">{spaces.length} espaces trouvés</p>
        <button className="border p-1 rounded" onClick={handleRefreshClick}>
          <LuRefreshCw />
        </button>
      </div>
      <section className="grid grid-cols-3 gap-2 xl:grid-cols-4 md:px-3 xl:px-14">
        <div
          className={
            cardSelected
              ? "cards scrollbar-hidden grid grid-cols-1 gap-y-4 col-span-1 py-5"
              : "cards scrollbar-hidden grid grid-cols-1 gap-y-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 py-5 col-span-4"
          }
        >
          {spaces.map((item) => (
            <Card
              key={uuidv4()}
              space={item}
              cardSelected={cardSelected}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
        <div className="card_detail overflow-auto flex justify-center items-start md:col-span-2 xl:col-span-3 pr-5 py-5">
          {cardSelected ? <CardDetail spaceDetail={detailSelected} /> : <></>}
        </div>
      </section>
    </div>
  );
}
