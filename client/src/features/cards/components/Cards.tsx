import { FaSchool } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { Space, QueryParams } from "../../filters/types";
import { useRef, useState } from "react";
import { useEffect } from "react";
import Calendar from "../../calendar/components/Calendar.tsx";

export default function Cards({ spaces, setQueryParams }) {
  const lastCardRef = useRef<HTMLDivElement | null>(null);
  const [currentSpaces, setCurrentSpaces] = useState<Space[]>(spaces);
  const [selectedSpace, setSelectedSpace] = useState<Space>(null);
  const [isCardSelected, setIsCardSelected] = useState(false);

  const handleCardClick = (space: Space) => {
    setSelectedSpace(space);
    setIsCardSelected(true);
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setQueryParams((prevQueryParams: QueryParams) => ({
              pagination: {
                ...prevQueryParams.pagination,
                page: `${Number(prevQueryParams.pagination.page) + 1}`,
              },
              filters: {
                ...prevQueryParams.filters,
              },
            }));
          }, 250);
        }
      },
      { threshold: 1.0 },
    );

    if (lastCardRef.current) {
      setTimeout(() => {
        observer.observe(lastCardRef.current);
      }, 1000);
    }

    return () => {
      if (lastCardRef.current) {
        observer.unobserve(lastCardRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setCurrentSpaces((prevSpaces) => [...prevSpaces, ...spaces]);
  }, [spaces]);

  return (
    <section className="cards-section">
      <div className={`${isCardSelected ? "layout" : ""}`}>
        <div
          className={`${isCardSelected ? "card-vertical-layout" : "cards-container"}`}
        >
          {currentSpaces.map((space: Space, index: number) => {
            const isLastCard = index === spaces.length - 1;
            return (
              <div
                key={index}
                className="card-container"
                ref={isLastCard ? lastCardRef : null}
                onClick={() => handleCardClick(space)}
              >
                <div className="card-image">
                  <img
                    src={"src/assets/images/random-space.JPG"}
                    alt={"space photo"}
                  />
                </div>
                <div className="card-info-container">
                  <div>
                    <div className="card-info-name-container">
                      <FaSchool className="school-logo " />
                      <div className="card-info-name">{space.name}</div>
                    </div>
                    <div className="card-info-library">{space.library}</div>
                    <div className="card-info-org">{space.organisation}</div>
                  </div>
                  <div className="card-info-cap-container">
                    <IoIosPeople className="people-logo" />
                    <div className="card-info-capacity">
                      Capacité {space.capacity}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {selectedSpace && <Calendar space={selectedSpace} />}
      </div>
    </section>
  );
}
