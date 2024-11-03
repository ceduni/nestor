import { GiCancel } from "react-icons/gi";

export default function FilterTags({ tags, handleCancelButtonClick }) {
  return (
    <div className="filter-tag-container">
      {tags.map((tag, index) => (
        <div className="filter-tag-item" key={index}>
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
