import { FaLocationDot } from "react-icons/fa6";

export default function AddressDropDown({
  locations,
  setAddressFilter,
  setShowAddressDropDown,
}) {
  const handleAddressDropDownTitleTitleClick = () => {
    const title = document.querySelector(".dropdown-item-title").textContent;
    const subtitle = document.querySelector(
      ".dropdown-item-subtitle",
    ).textContent;
    setAddressFilter(title + ", " + subtitle);
    setShowAddressDropDown(false);
  };
  const handleAddressDropDownSubtitleTitleClick = () => {
    const subtitle = document.querySelector(
      ".dropdown-item-subtitle",
    ).textContent;
    setAddressFilter(subtitle);
    setShowAddressDropDown(false);
  };
  return (
    <div className="dropdown-container">
      {locations.map((location, index) => {
        let title = "";
        let subtitle = "";
        if (location.streetNumber) {
          title += location.streetNumber + " " + location.streetName;
          subtitle +=
            location.city + ", " + location.state + ", " + location.country;
        } else if (location.streetName) {
          title += location.streetName;
          subtitle +=
            location.city + ", " + location.state + ", " + location.country;
        } else if (location.city) {
          title += location.city;
          subtitle += location.state + ", " + location.country;
        } else if (location.state) {
          title += location.state + " " + location.country;
        } else title += location.country;
        return (
          <div className="dropdown-item-wrapper" key={index}>
            <div className="dropdown-left-item">
              <div className="location-icon">
                <FaLocationDot />
              </div>
              <div className="dropdown-item-text-container">
                <div
                  className="dropdown-item-title"
                  onClick={handleAddressDropDownTitleTitleClick}
                >
                  {title}
                </div>
                <div
                  className="dropdown-item-subtitle"
                  onClick={handleAddressDropDownSubtitleTitleClick}
                >
                  {subtitle}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
