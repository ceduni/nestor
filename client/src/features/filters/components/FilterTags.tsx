import { GiCancel } from "react-icons/gi";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useRef } from "react";

export default function FilterTags({ tags, handleCancelButtonClick }) {
  return (
      <div className="filter-tag-container">
        <TransitionGroup component={null} className="filter-tag-container">
          {tags.map((tag, index) => (
              <CSSTransition
                  key={index}
                  timeout={300}
                  classNames="filter-tag-item"
              >
                <div className="filter-tag-item">
                  <div className="filter-tag-item-container">
                    <div className="filter-tag-label">{tag}</div>
                    <GiCancel
                        className="cancel-icon"
                        onClick={() => handleCancelButtonClick(tag)}
                    />
                  </div>
                </div>
              </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
  );
}

