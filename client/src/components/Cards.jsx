import React, { useEffect, useState } from "react";
import Card from "./Card";
import CardDetail from "./CardDetail";
import { LuRefreshCw } from "react-icons/lu";
import { BsFillGrid1X2Fill, BsFillGrid3X3GapFill } from "react-icons/bs";

export default function Cards({ allSpaces, filters, featureFilters, categoryFilters }) {
  // States
  const [cardSelected, setCardSelected] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const [detailSelected, setDetailSelected] = useState({});

  // effects
  useEffect(() => {
    setSpaces(allSpaces);
  }, [allSpaces]);

  useEffect(() => {
    filtering(filters);
  }, [filters, featureFilters, categoryFilters]);

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
    if (filters.date) {
      filteredSpaces = filteredSpaces.filter(
          (space) =>
              space.availabilities.some((avail) =>
                  avail.startAt.includes(filters.date),
              ),
      );
    }
    filteredSpaces = filteredSpaces.filter(
      (space) =>
        Number(filters.peopleNum) === 0 ||
        space.capacity >= Number(filters.peopleNum),
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
    if (categoryFilters.length !== 0) {
      filteredSpaces = filteredSpaces.filter(
          (space) =>
              categoryFilters.every((categoryFilter) =>
                  space.type.includes(categoryFilter),
              ),
      );
    }
    if (featureFilters.length !== 0) {
      filteredSpaces = filteredSpaces.filter(
        (space) =>
          featureFilters.every((featureFilter) =>
            space.features.includes(featureFilter),
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

  const handleDisplaymodeClick = () => {
    setCardSelected((prev) => !prev);
    handleSelectSpaceDetail(spaces[0]);
  };

  return (
    <div className="">
      <div className="flex justify-center items-center top-60  p-2 bg-white z-2 h-14">
        <p className="text-center p-3 font-bold">
          {spaces.length} espaces trouvés
        </p>
        <button onClick={handleDisplaymodeClick} className="border p-1 rounded">
          {!cardSelected ? (
            <BsFillGrid1X2Fill className="display_btn" />
          ) : (
            <BsFillGrid3X3GapFill />
          )}
        </button>
      </div>

      <section className="px-20 pb-5 gap-x-5 flex justify-center z-0 h-max">
        <div
          className={`${cardSelected ? "cards_left flex flex-col gap-3 w-[600px] overflow-y-auto" : "grid grid-cols-4 gap-8 auto-rows-fr"}`}
        >
          {spaces.map((item, index) => (
            <Card
              key={index}
              space={item}
              cardSelected={cardSelected}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
        <div className="card_detail">
          {cardSelected && spaces.length !== 0 ? (
            <CardDetail spaceDetail={detailSelected} />
          ) : (
            <></>
          )}
        </div>
      </section>
    </div>
  );
}
