import { GiCancel } from "react-icons/gi";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useState } from "react";
import { useRef } from "react";

export default function FilterTags({ tags, handleCancelButtonClick }) {
  const [inProp, setInProp] = useState(false);
  const nodeRef = useRef(null);
  return (
    <TransitionGroup className="filter-tag-container">
      {tags.map((tag, index: number) => (
        <CSSTransition key={index} timeout={500} classNames="filter-tag-item">
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
  );
}
