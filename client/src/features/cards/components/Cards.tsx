import { FaSchool } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import {CSSTransition, TransitionGroup} from "react-transition-group";

export default function Cards({ spaces }) {
  return (
    <section className="cards-section">
        <div className="cards-container">
            <TransitionGroup component={null} className="cards-container">
                {spaces.map((space, index) => {
                    return (
                        <CSSTransition key={index} timeout={300} classNames="cards-item">
                            <div className="cards-item" key={index}>
                                <div className="card-container">
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
                            </div>
                        </CSSTransition>
                    );
                })}
            </TransitionGroup>
        </div>
    </section>
  );
}
