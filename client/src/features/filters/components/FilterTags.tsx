import { GiCancel } from "react-icons/gi";
import {motion} from "framer-motion";

export default function FilterTags({ tags, handleCancelButtonClick }) {
  return (
    <div className="filter-tag-container">
        {tags.map((tag, index) => (
            <div key={index} className="filter-tag-item">
              <div className="filter-tag-item-container">
                <div className="filter-tag-label">{tag}</div>
                <GiCancel
                  className="cancel-icon"
                  onClick={() => handleCancelButtonClick(tag)}
                />
              </div>
            </div>
        ))}
    </div>
  );
}
