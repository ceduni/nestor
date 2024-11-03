import { FaLocationDot } from "react-icons/fa6";

export default function AddressDropDown({
  locations,
  setAddressFilter,
  setShowAddressDropDown,
  dropDownRef,
}) {
  const handleAddressDropDownTitleClick = (title, subtitle) => {
    setAddressFilter(title + ", " + subtitle);
    setShowAddressDropDown(false);
  };
  const handleAddressDropDownSubtitleClick = (title, subtitle) => {
    setAddressFilter(subtitle);
    setShowAddressDropDown(false);
  };
  return (
    <div className="dropdown-container" ref={dropDownRef}>
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
                  onClick={() =>
                    handleAddressDropDownTitleClick(title, subtitle)
                  }
                >
                  {title}
                </div>
                <div
                  className="dropdown-item-subtitle"
                  onClick={() =>
                    handleAddressDropDownSubtitleClick(title, subtitle)
                  }
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
