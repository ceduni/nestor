import React from "react";
import { v4 as uuidv4 } from "uuid";
import { IoMdClose } from "react-icons/io";

export default function FiltersTags({ filterTags }) {
  return (
    <div className="flex gap-3 ">
      {filterTags.map((tag) => (
        <div
          className="flex justify-center items-center gap-2 border rounded-full px-2 py-1"
          key={uuidv4()}
        >
          <p>{tag}</p>
          <IoMdClose />
        </div>
      ))}
    </div>
  );
}
