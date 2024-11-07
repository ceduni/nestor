import { FaSchool } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { motion } from "framer-motion";
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
            duration: 0.5
        }
    }
}
export default function Cards({ spaces }) {
  return (
    <section className="cards-section">
      <motion.div className="cards-container" variants={container} initial="hidden" animate="visible">
          {spaces.map((space, index) => (
              <motion.div key={index} className="card-container" variants={item}>
                <div className="card-image">
                  <img
                    src={"src/assets/images/random-space.JPG"}
                    alt={"space photo"}
                  />
                </div>
                <div className="card-info-container">
                  <div>
                    <div className="card-info-name-container">
                      <FaSchool className="school-logo " />
                      <div className="card-info-name">{space.name}</div>
                    </div>
                    <div className="card-info-library">{space.library}</div>
                    <div className="card-info-org">{space.organisation}</div>
                  </div>
                  <div className="card-info-cap-container">
                    <IoIosPeople className="people-logo" />
                    <div className="card-info-capacity">
                      Capacité {space.capacity}
                    </div>
                  </div>
                </div>
              </motion.div>
          ))}
      </motion.div>
        <div className="loader"></div>
    </section>
  );
}
