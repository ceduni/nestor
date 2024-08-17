import React, { useEffect, useState } from "react";

export default function MultiCheckBoxes({ title, boxItems, onUpdateList }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    onUpdateList(items);
  }, [items]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    if (e.target.checked) {
      setItems((prev) => [...prev, name]);
    } else {
      setItems(items.filter((item) => item !== name));
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <p className="font-bold">{title}</p>
      <fieldset className="flex flex-wrap gap-x-4 pl-2">
        {boxItems.map((item) => (
          <div key={item.name} className="flex gap-1">
            <input
              id={item.name}
              name={item.name}
              className="border"
              type="checkbox"
              onChange={handleInputChange}
            />
            <label htmlFor={item.name}>{item.label}</label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}
