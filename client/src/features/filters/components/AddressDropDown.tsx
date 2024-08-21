import {useContext} from "react";
import {SpaceContext} from "./Filter.tsx";
import {Space} from "../types.ts";
import {FaLocationDot} from "react-icons/fa6";

export default function AddressFilterDropDown() {
    const {spaces, isLoading} = useContext(SpaceContext);

    return (
        <div className="dropdown-container">
            {isLoading && <div className="dropdown-item-wrapper" key={space.id}>
                <div className="dropdown-left-item">
                    <div className="location-icon">
                        <FaLocationDot />
                    </div>
                    <div>
                        <div className="dropdown-item-title">{space.street}</div>
                        <div className="dropdown-item-subtitle">{space.city}, {space.state}</div>
                    </div>
                </div>
                <div className="dropdown-right-item">
                    2 km
                </div>
            </div>}
            {
                spaces?.map(space => {
                    return(
                        <div className="dropdown-item-wrapper" key={space.id}>
                            <div className="dropdown-left-item">
                                <div className="location-icon">
                                    <FaLocationDot />
                                </div>
                                <div>
                                    <div className="dropdown-item-title">{space.street}</div>
                                    <div className="dropdown-item-subtitle">{space.city}, {space.state}</div>
                                </div>
                            </div>
                            <div className="dropdown-right-item">
                                2 km
                            </div>
                        </div>
                        )
                })
            }
        </div>
    )
}