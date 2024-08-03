import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import SpaceAdd from "../pages/SpaceAdd";

export default function GererMesEspaces() {
  const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
  const handleAddSpace = () => {
    setIsAddBtnClicked(true);
  };

  return (
    <section>
      <header className="pl-5 text-4xl bg-black h-40">
        <h1 className="text-white relative top-12 text-center">Mes espaces</h1>
      </header>
      <article>
        <div className="flex justify-center items-start pt-3">
          <p className="text-center p-3">X espaces trouvés</p>
          <button className="border p-2 rounded-full">
            <Link to="spaceadd">+ Ajouter un espace</Link>
          </button>
        </div>
        {/* {isAddBtnClicked && <SpaceAdd />} */}
        <Routes>
          <Route path="/spaceadd" element={<SpaceAdd />} />
        </Routes>
      </article>
    </section>
  );
}
