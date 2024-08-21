import {useContext, useEffect} from "react";
import {FilterContext} from "./Filter.tsx";
import {FaLocationDot} from "react-icons/fa6";

export default function AddressDropDown({spaces}) {

    return (
        <div className="dropdown-container">
            {
                spaces.map(space => {
                    return(
                        <div className="dropdown-item-wrapper" key={space.id}>
                            <div className="dropdown-left-item">
                                <div className="location-icon">
                                    <FaLocationDot />
                                </div>
                                <div>
                                    <div className="dropdown-item-title">{space.streetNumber} {space.streetName}</div>
                                    <div className="dropdown-item-subtitle">{space.state}, {space.country}</div>
                                </div>
                            </div>
                            <div className="distance-tag">2 km</div>
                        </div>
                    )
                })
            }
        </div>
    )
}