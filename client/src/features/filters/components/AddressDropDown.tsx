import {useContext, useEffect} from "react";
import {FilterContext} from "./Filter.tsx";
import {FaLocationDot} from "react-icons/fa6";

export default function AddressDropDown({locations}) {

    return (
        <div className="dropdown-container">
            {
                locations.map(location => {
                    return(
                        <div className="dropdown-item-wrapper" key={location.id}>
                            <div className="dropdown-left-item">
                                <div className="location-icon">
                                    <FaLocationDot />
                                </div>
                                <div className="dropdown-item-text-container">
                                    <div className="dropdown-item-title" >{location.streetNumber} {location.streetName}</div>
                                    <div className="dropdown-item-subtitle">{location.state}, {location.country}</div>
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