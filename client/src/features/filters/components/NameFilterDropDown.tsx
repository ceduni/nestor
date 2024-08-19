import {useContext} from "react";
import {SpaceContext} from "./Filter.tsx";
import {Space} from "../types.ts";

export default function NameFilterDropDown() {
    const spaces = useContext(SpaceContext);

    return (
        <div className="dropdown-container">
            {
                spaces?.map(space => {
                    return(
                        <div className="dropdown-item" key={space.id}>
                            <div className="dropdown-item-title">{space.name}</div>
                            <div className="dropdown-item-subtitle">{space.organisation}</div>
                        </div>
                        )
                })
            }
        </div>
    )
}