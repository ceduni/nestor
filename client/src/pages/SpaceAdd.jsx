import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TimeAvailability from "../components/TimeAvailability";
import MultiCheckBoxes from "../components/MultiCheckBoxes";

const equips = [
  { name: "plug", label: "Prise" },
  { name: "screen", label: "Écran" },
  { name: "whiteboard", label: "Tableau" },
  { name: "projector", label: "Projecteur" },
  { name: "wifi", label: "Wifi" },
];

const categoriesInfo = [
  { name: "university", label: "Université" },
  { name: "library", label: "Bibliothèque" },
  { name: "coffee", label: "Café" },
  { name: "nature", label: "Nature" },
  { name: "laboratory", label: "Laboratoire" },
];

export default function SpaceAdd() {
  const navigate = useNavigate();
  const [imagesInfo, setImagesInfo] = useState([]);
  const [availNum, setAvailNum] = useState(0);
  const avails = Array.from({ length: availNum }, (_, index) => index + 1);
  const [equipments, setEquipements] = useState([]); // features
  const [categories, setCategories] = useState([]); // type
  const [availabilities, setAvailabilities] = useState([]);
  const [spaceInfo, setSpaceInfo] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    capacity: 8,
    isAvailable: true,
    images: [],
    description: "",
    organisation: "",
    features: [],
    availabilities: [
      {
        startAt: "2024-08-05T09:00:00Z",
        endAt: "2024-08-05T11:00:00Z",
      },
      {
        startAt: "2024-08-05T13:00:00Z",
        endAt: "2024-08-05T15:00:00Z",
      },
    ],
    type: [],
  });

  const hasEmptyFields = (obj) => {
    return Object.values(obj).some((value) => {
      if (Array.isArray(value)) {
        return value.length === 0;
      } else if (typeof value === "boolean" || value === 0) {
        return false;
      } else {
        return !value;
      }
    });
  };
  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("availabilities : ", availabilities);
    console.log("Equipements : ", equipments);
    console.log("categories : ", categories);
    console.log("imagesInfo : ", imagesInfo);
    console.log("spaceInfo : ", spaceInfo);
    const updatedSpaceInfo = {
      ...spaceInfo,
      images: imagesInfo,
      features: equipments,
      // availabilities: availabilities,
      type: categories,
    };
    console.log("updated : ", updatedSpaceInfo);

    if (hasEmptyFields(updatedSpaceInfo)) {
      alert("Tous les champs doivent être remplis!");
      return;
    } else {
      // post add space
      const testSpace = {
        name: "Test space 777799",
        street: "L'Entraide Pont-Viaurue St-André",
        city: "Lasalle",
        state: "QC",
        postalCode: "H7G 3A5",
        capacity: 20,
        isAvailable: true,
        images: [
          {
            url: "src/assets/images/agrandissement-1.jpg",
            isMain: true,
          },
          {
            url: "src/assets/images/agrandissement-2.jpg",
            isMain: false,
          },
        ],
        description: "Espace Génial",
        organisation: "Association de location de salles du Québec",
        features: ["wifi", "screen"],
        availabilities: [
          {
            startAt: "2024-08-05T09:00:00Z",
            endAt: "2024-08-05T11:00:00Z",
          },
          {
            startAt: "2024-08-05T13:00:00Z",
            endAt: "2024-08-05T15:00:00Z",
          },
        ],
        type: ["library"],
      };
      console.log(testSpace);
      postAddSpace(updatedSpaceInfo);
    }
  };
  const postAddSpace = async (space) => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/spaces/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(space),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  // Text & number fields
  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setSpaceInfo((prev) =>
      prev
        ? {
            ...prev,
            [name]: value,
          }
        : prev,
    );
  };
  // Images
  const handleImageInput = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    const imagesInfo = urls.map((url, index) => {
      const isMain = index === 0 ? true : false;
      const info = { url: url, isMain: isMain };
      return info;
    });
    setImagesInfo(imagesInfo);
  };
  // Annuler
  const handleAnnulerClick = (e) => {
    e.preventDefault();
    navigate("../gérermesespaces");
  };
  // Availabilities
  const handleAvailDeleteClick = (index) => {
    console.log(index);
    console.log(availabilities);
    setAvailNum((prev) => prev - 1);
    setAvailabilities(availabilities.filter((_, i) => i !== index));
  };
  const handleAvailAddClick = (e) => {
    console.log(e.target);
    console.log(availabilities);
    e.preventDefault();
    setAvailNum((prev) => prev + 1);
    setAvailabilities((prev) => [...prev, { startAt: "", endAt: "" }]);
  };
  const handleAvailabilityUpdate = (index, newAvail) => {
    const updatedAvails = availabilities.map((avail, i) =>
      i === index ? newAvail : avail,
    );
    setAvailabilities(updatedAvails);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="spaceadd_container flex flex-col justify-center items-center gap-5 rounded-3xl m-10 px-5 py-10 shadow-md">
        <h1 className="text-2xl font-bold">Ajouter un espace</h1>
        <form id="space_add_form" className="flex flex-col gap-3">
          {/* Images */}
          <div className="flex flex-col gap-1">
            <label htmlFor="space_images_input" className="font-bold">
              Images
            </label>
            <small className="pl-2">
              Vous devez sélectionner au moins 1 image et au plus 4 images
            </small>
            <input
              id="space_images_input"
              name="images"
              accept="image/*"
              className="spaceadd_input"
              type="file"
              multiple
              onChange={handleImageInput}
            />
            <div className="flex gap-x-2 pl-1">
              {imagesInfo.map((imageInfo, index) => (
                <img
                  key={index}
                  src={imageInfo.url}
                  alt={`Selected preview ${index}`}
                  className="w-1/4 h-24 border"
                />
              ))}
            </div>
            {/* Texts & number */}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="space_name" className="font-bold">
              Nom
            </label>
            <input
              id="space_name"
              name="name"
              className="spaceadd_input border"
              type="text"
              placeholder="Entrer le nom d'espace"
              onChange={handleInputsChange}
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-x-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="space_street" className="font-bold">
                  Rue
                </label>
                <input
                  id="space_street"
                  name="street"
                  className="spaceadd_address_input border w-80"
                  type="text"
                  placeholder="Entrer le nom de la rue"
                  onChange={handleInputsChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="space_city" className="font-bold">
                  Ville
                </label>
                <input
                  id="space_city"
                  name="city"
                  className="spaceadd_address_input border w-44"
                  type="text"
                  placeholder="Entrer la ville"
                  onChange={handleInputsChange}
                />
              </div>
            </div>
            <div className="flex gap-x-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="space_state" className="font-bold">
                  Province
                </label>
                <input
                  id="space_state"
                  name="state"
                  className="spaceadd_address_input border w-80"
                  type="text"
                  placeholder="Entrer la province"
                  onChange={handleInputsChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="space_postalcode" className="font-bold">
                  Code postal
                </label>
                <input
                  id="space_postalcode"
                  name="postalCode"
                  className="spaceadd_address_input border w-44"
                  type="text"
                  placeholder="Entrer le code postal"
                  onChange={handleInputsChange}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-x-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="space_capacity" className="font-bold">
                Capacité
              </label>
              <input
                id="space_capacity"
                name="capacity"
                className="border w-64"
                type="number"
                min={1}
                placeholder="Entrer la capacité"
                onChange={handleInputsChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="space_invitation_availability"
                className="font-bold"
              >
                Invitation
              </label>
              <select
                id="space_invitation_availability"
                name="isAvailable"
                className="border w-60"
                onChange={handleInputsChange}
              >
                <option value={true}>Disponible</option>
                <option value={false}>Non disponible</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="space_description" className="font-bold">
              Description
            </label>
            <input
              id="space_description"
              name="description"
              className="spaceadd_input border p-1"
              type="text"
              placeholder="Entrer la description de l'espace"
              onChange={handleInputsChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="space_organisation" className="font-bold">
              Organisation
            </label>
            <input
              id="space_organisation"
              name="organisation"
              className="spaceadd_input border"
              type="text"
              placeholder="Entrer le nom de l'organisation"
              onChange={handleInputsChange}
            />
          </div>

          <MultiCheckBoxes
            title="Équipements"
            boxItems={equips}
            onUpdateList={setEquipements}
          />
          <MultiCheckBoxes
            title="Catégories"
            boxItems={categoriesInfo}
            onUpdateList={setCategories}
          />

          <div className="flex flex-col gap-y-3">
            <p className="font-bold">Heures de disponibilité</p>
            {avails.map((_, index) => (
              <TimeAvailability
                key={index}
                index={index}
                onDeleteAvailability={handleAvailDeleteClick}
                onUpdateAvailabilities={handleAvailabilityUpdate}
              />
            ))}
            <div className="flex justify-center">
              <button
                onClick={handleAvailAddClick}
                className="border w-8 rounded font-bold"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <input
              className="border p-2 w-20 rounded font-bold"
              type="button"
              value="Annuler"
              onClick={handleAnnulerClick}
            />
            <input
              className="border p-2 w-20 rounded font-bold"
              type="button"
              value="Ajouter"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
