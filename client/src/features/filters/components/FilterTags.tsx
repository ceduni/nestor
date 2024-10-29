import { GiCancel } from "react-icons/gi";
import {useEffect, useState} from "react";

export default function FilterTags({queryParams}) {
    return (
        <div className="filter-tag-item">
            <div className="filter-tag-item-container">
                <div className="filter-tag-label">université</div>
                <GiCancel className="cancel-icon"/>
            </div>
        </div>
    )
}