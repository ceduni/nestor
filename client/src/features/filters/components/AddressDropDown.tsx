import {useContext, useEffect} from "react";
import {FilterContext} from "./Filter.tsx";
import {FaLocationDot} from "react-icons/fa6";

export default function AddressDropDown({locations}) {

    return (
        <div className="dropdown-container">
            {
                locations.map(location => {
                    const hasStreetInfo = location.streetNumber || location.streetName;
                    // Determine the title and subtitle based on available information
                    const title = hasStreetInfo
                        ? `${location.streetNumber ? location.streetNumber + ' ' : ''}${location.streetName || ''}`
                        : location.city
                            ? location.city
                            : location.state
                                ? location.state
                                : location.country; // Use country if only country is available

                    const subtitle = !hasStreetInfo
                        ? location.city
                            ? `${location.state ? location.state + ', ' : ''}${location.country || ''}` // City with state and/or country
                            : location.state
                                ? `${location.country || ''}` // State without city; country as subtitle
                                : '' // Empty subtitle if only country is used as title
                        : ''; // Empty subtitle if street info is used as title

                    return(
                        <div className="dropdown-item-wrapper" key={location.id}>
                            <div className="dropdown-left-item">
                                <div className="location-icon">
                                    <FaLocationDot />
                                </div>
                                <div className="dropdown-item-text-container">
                                    <div className="dropdown-item-title" >{title}</div>
                                    <div className="dropdown-item-subtitle">{subtitle}</div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}