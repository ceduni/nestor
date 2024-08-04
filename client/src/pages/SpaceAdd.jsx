import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


export default function SpaceAdd() {
    const navigate = useNavigate();
    const [imageUrls, setImageUrls] = useState([]);
    const [equipments, setEquipements] = useState([]);
    const [categories, setCategories] = useState([]);
    const [availabilities, setAvailabilities] = useState([]);
    const [spaceInfo, setSpaceInfo] = useState({
        name: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        capacity: 0,
        isAvailable: true,
        images: [],
        description: "",
        organisation: "",
        features: [],
        availabilities: [],
        type: []
    });
    const handleImageInput = (e)=>{
        const files = Array.from(e.target.files);
        const urls = files.map(file => URL.createObjectURL(file));
        setImageUrls(urls);
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
    }
    const handleAnnulerClick = (e)=>{
        e.preventDefault();
        navigate("../gérermesespaces");
    }
    return (
        <div className="flex justify-center items-center">
            <div className="spaceadd_container flex flex-col justify-center items-center gap-5 rounded-3xl m-10 px-5 py-10 shadow-md">
                <h1 className='text-2xl font-bold'>Ajouter un espace</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="space_images_input" className='font-bold'>Images</label>
                        <small className='pl-2'>Vous devez sélectionner au moins 1 image et au plus 4 images</small>
                        <input
                            id="space_images_input"
                            name='images'
                            accept='image/*'
                            className="spaceadd_input"
                            type="file"
                            multiple
                            onChange={handleImageInput}
                        />
                        <div className='flex gap-x-2 pl-1'>
                        {imageUrls.map((imageUrl, index)=>(
                            <img
                                key={index}
                                src={imageUrl}
                                alt={`Selected preview ${index}`}
                                className='w-1/4 h-20'
                            />
                        ))}
                    </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="space_name" className='font-bold'>Nom</label>
                        <input
                            id="space_name"
                            name='name'
                            className="spaceadd_input border"
                            type="text"
                            placeholder="Entrer le nom d'espace"
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='flex gap-x-3'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="space_street" className='font-bold'>Rue</label>
                                <input
                                    id="space_street"
                                    name='street'
                                    className="spaceadd_address_input border w-80"
                                    type="text"
                                    placeholder="Entrer le nom de la rue"
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="space_city" className='font-bold'>Ville</label>
                                <input
                                    id="space_city"
                                    name='city'
                                    className="spaceadd_address_input border w-32"
                                    type="text"
                                    placeholder="Entrer la ville"
                                />
                            </div>
                        </div>
                        <div className='flex gap-x-3'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="space_state" className='font-bold'>Province</label>
                                <input
                                    id="space_state"
                                    name='state'
                                    className="spaceadd_address_input border w-72"
                                    type="text"
                                    placeholder="Entrer la province"
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="space_postalcode" className='font-bold'>Code postal</label>
                                <input
                                    id="space_postalcode"
                                    name='postalCode'
                                    className="spaceadd_address_input border w-40"
                                    type="text"
                                    placeholder="Entrer le code postal"
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-x-3'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="space_capacity" className='font-bold'>Capacité</label>
                            <input
                                id="space_capacity"
                                name='capacity'
                                className="border w-56"
                                type="number"
                                min="1"
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="space_invitation_availability" className='font-bold'>Invitation</label>
                            <select
                                id="space_invitation_availability"
                                name='isAvailable'
                                className="border w-56"
                            >
                                <option value="Étudiant">Disponible</option>
                                <option value="Administrateur">Non disponible</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="space_description" className='font-bold'>Description</label>
                        <input
                            id="space_description"
                            name='description'
                            className="spaceadd_input border"
                            type="text"
                            placeholder="Entrer la description de l'espace"
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="space_organisation" className='font-bold'>Organisation</label>
                        <input
                            id="space_organisation"
                            name='organisation'
                            className="spaceadd_input border"
                            type="text"
                            placeholder="Entrer le nom de l'organisation"
                        />
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <label htmlFor="prise" className='font-bold'>Équipements</label>
                        <fieldset className='flex flex-wrap gap-x-4 pl-2'>
                            <div className='flex gap-1'>
                                <input
                                    id="prise"
                                    name='prise'
                                    className="border"
                                    type="checkbox"
                                />
                                <label htmlFor="prise">Prise</label>
                            </div>
                            <div className='flex gap-1'>
                                <input
                                    id="screen"
                                    name='screen'
                                    className="border"
                                    type="checkbox"
                                />
                                <label htmlFor="screen">Écran</label>
                            </div>
                            <div className='flex gap-1'>
                                <input
                                    id="board"
                                    name='board'
                                    className="border"
                                    type="checkbox"
                                />
                                <label htmlFor="board">Tableau</label>
                            </div>
                            <div className='flex gap-1'>
                                <input
                                    id="projector"
                                    name='projector'
                                    className="border"
                                    type="checkbox"
                                />
                                <label htmlFor="projector">Projecteur</label>
                            </div>
                            <div className='flex gap-1'>
                                <input
                                    id="Wifi"
                                    name='Wifi'
                                    className="border"
                                    type="checkbox"
                                />
                                <label htmlFor="Wifi">Wifi</label>
                            </div>
                        </fieldset>
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <label htmlFor="prise" className='font-bold'>Catégorie</label>
                        <fieldset className='flex flex-wrap gap-x-5 gap-y-2 pl-2'>
                            <div className='flex gap-1'>
                                <input
                                    id="university"
                                    name='university'
                                    className="border"
                                    type="checkbox"
                                />
                                <label htmlFor="university">Université</label>
                            </div>
                            <div className='flex gap-1'>
                                <input
                                    id="library"
                                    name='library'
                                    className="border"
                                    type="checkbox"
                                />
                                <label htmlFor="library">Bibliothèque</label>
                            </div>
                            <div className='flex gap-1'>
                                <input
                                    id="cafe"
                                    name='cafe'
                                    className="border"
                                    type="checkbox"
                                />
                                <label htmlFor="cafe">Café</label>
                            </div>
                            <div className='flex gap-1'>
                                <input
                                    id="nature"
                                    name='nature'
                                    className="border"
                                    type="checkbox"
                                />
                                <label htmlFor="nature">Nature</label>
                            </div>
                            <div className='flex gap-1'>
                                <input
                                    id="Wilaboratoryfi"
                                    name='laboratory'
                                    className="border"
                                    type="checkbox"
                                />
                                <label htmlFor="laboratory">Laboratoire</label>
                            </div>
                        </fieldset>
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <label htmlFor="space_postalcode" className='font-bold'>Heures de disponibilité</label>
                        <div className='flex items-center justify-between pl-2'>
                            <div className='flex items-center gap-x-2'>
                                <label htmlFor="">Début</label>
                                <input
                                    id="space_available_time"
                                    name='availability'
                                    className="border w-40 p-1"
                                    type="time"
                                />
                            </div>
                            <p>-----</p>
                            <div className='flex items-center gap-x-2'>
                                <label htmlFor="">Fin</label>
                                <input
                                    id="space_available_time"
                                    name='availability'
                                    className="border w-40 p-1"
                                    type="time"
                                />
                            </div>
                        </div>
                        <button className='border w-12'>+</button>
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
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

