import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import TimeAvailability from '../components/TimeAvailability';
import MultiCheckBoxes from '../components/MultiCheckBoxes';

const equips = [
    {name: "prise", label: "Prise"},
    {name: "screen", label: "Écran"},
    {name: "board", label: "Tableau"},
    {name: "projector", label: "Projecteur"},
    {name: "wifi", label: "Wifi"},
]

const categoriesInfo = [
    {name: "university", label: "Université"},
    {name: "library", label: "Bibliothèque"},
    {name: "cafe", label: "Café"},
    {name: "nature", label: "Nature"},
    {name: "laboratory", label: "Laboratoire"},
]

export default function SpaceAdd() {
    const navigate = useNavigate();
    const [imagesInfo, setImagesInfo] = useState([]);
    const [availNum, setAvailNum] = useState(0);
    const avails = Array.from({length: availNum}, (_, index)=> index + 1);
    const [equipments, setEquipements] = useState([]); // features
    const [categories, setCategories] = useState([]); // type
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
    
    
    // Submit form
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("availabilities : ", availabilities);
        console.log("Equipements : ", equipments);
        console.log("categories : ", categories);
        console.log("imagesInfo : ", imagesInfo);
        console.log(spaceInfo);
    };
    // Images
    const handleImageInput = (e)=>{
        const files = Array.from(e.target.files);
        const urls = files.map(file => URL.createObjectURL(file));
        const imagesInfo = urls.map((url, index) =>{
            const isMain = index === 0 ? true : false;
            const info = {url: url, isMain:isMain};
            return info;
        })
        setImagesInfo(imagesInfo);
    };
    // Annuler
    const handleAnnulerClick = (e)=>{
        e.preventDefault();
        navigate("../gérermesespaces");
    };
    // Availabilities
    const handleAvailDeleteClick = (index)=>{
        console.log(index);
        console.log(availabilities);
        setAvailNum(prev => prev - 1);
        setAvailabilities(availabilities.filter((_, i) => i !== index));
    };
    const handleAvailAddClick = (e)=>{
        console.log(e.target);
        console.log(availabilities);
        e.preventDefault();
        setAvailNum(prev => prev + 1);
        setAvailabilities(prev => [...prev, {startAt: '', endAt: ''}]);
    };
    const handleAvailabilityUpdate = (index, newAvail)=>{
        const updatedAvails = availabilities.map((avail, i)=>
            i === index ? newAvail : avail);
        setAvailabilities(updatedAvails);
    }

    return (
        <div className="flex justify-center items-center">
            <div className="spaceadd_container flex flex-col justify-center items-center gap-5 rounded-3xl m-10 px-5 py-10 shadow-md">
                <h1 className='text-2xl font-bold'>Ajouter un espace</h1>
                <form className="flex flex-col gap-3">
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
                        {imagesInfo.map((imageInfo, index)=>(
                            <img
                                key={index}
                                src={imageInfo.url}
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
                                    className="spaceadd_address_input border w-44"
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
                                    className="spaceadd_address_input border w-80"
                                    type="text"
                                    placeholder="Entrer la province"
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="space_postalcode" className='font-bold'>Code postal</label>
                                <input
                                    id="space_postalcode"
                                    name='postalCode'
                                    className="spaceadd_address_input border w-44"
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
                                className="border w-64"
                                type="number"
                                min="1"
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="space_invitation_availability" className='font-bold'>Invitation</label>
                            <select
                                id="space_invitation_availability"
                                name='isAvailable'
                                className="border w-60"
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

                    <MultiCheckBoxes title="Équipements" boxItems={equips} onUpdateList={setEquipements}/>
                    <MultiCheckBoxes title="Catégories" boxItems={categoriesInfo} onUpdateList={setCategories}/>
                    
                    <div className='flex flex-col gap-y-3'>
                        <label htmlFor="space_postalcode" className='font-bold'>Heures de disponibilité</label>
                        {avails.map((_, index) =>(
                            <TimeAvailability 
                                key={index} 
                                index={index} 
                                onDeleteAvailability={handleAvailDeleteClick}
                                onUpdateAvailabilities={handleAvailabilityUpdate}
                            />
                        ))}
                        <div className='flex justify-center'>
                            <button onClick={handleAvailAddClick} className='border w-8 rounded font-bold'>+</button>
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

