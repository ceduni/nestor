import { GiCancel } from "react-icons/gi";
import {useEffect, useState} from "react";
import { format } from "date-fns";

export default function FilterTags({queryParams}) {
    const [tags, setTags] = useState([])
    const handleCancelButtonClick = (cancelledTag: string) => {
        setTags((prev) => prev.filter((tag) => tag !== cancelledTag));
    }
    useEffect(() => {
        setTags([])
        if (queryParams.filters) {
            const { date, address, capacity, features} = queryParams.filters
            if(date) {
                setTags(prevTag => [...prevTag, format(date, "yyyy-MM-dd")])
            }
            if(capacity) {
                setTags(prevTag => [...prevTag, "capacité " +capacity])
            }
            if(address) {
                setTags(prevTag => [...prevTag, address])
            }
            if(features.length !== 0) {
                features.forEach(feature => setTags(prevTag => [...prevTag, feature]))
            }
        }
    }, [queryParams]);

    return (
        <div className="filter-tag-container">
            {tags.map((tag, index) => (
            <div className="filter-tag-item" key={index}>
                <div className="filter-tag-item-container">
                    <div className="filter-tag-label">{tag}</div>
                    <GiCancel className="cancel-icon" onClick={() => handleCancelButtonClick(tag)}/>
                </div>
            </div>
            ))}
        </div>
    )
}