import { GiCancel } from "react-icons/gi";
import {motion} from "framer-motion";

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
}

const item = {
    hidden: { x: -20, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.2
        }
    }
}

export default function FilterTags({ tags, handleCancelButtonClick }) {
  return (
    <motion.div className="filter-tag-container" variants={container} initial="hidden" animate="visible">
        {tags.map((tag, index) => (
            <motion.div key={index} className="filter-tag-item" variants={item}>
              <div className="filter-tag-item-container">
                <div className="filter-tag-label">{tag}</div>
                <GiCancel
                  className="cancel-icon"
                  onClick={() => handleCancelButtonClick(tag)}
                />
              </div>
            </motion.div>
        ))}
    </motion.div>
  );
}
