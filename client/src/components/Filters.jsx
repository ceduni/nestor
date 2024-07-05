import React, {useState} from 'react';
import { LuSchool2 } from "react-icons/lu";
import { IoSearchCircle, IoLibraryOutline } from "react-icons/io5";
import { VscCoffee } from "react-icons/vsc";
import { MdOutlinePark } from "react-icons/md";
import { MdOutlineCottage } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import FiltersExtra from './FiltersExtra';
import FilterTags from './FiltersTags';

export default function Filters({onNameFilterUpdate, onAddressFilterUpdate, onFiltersUpdate}) {
    const [filterBtnCliked, setFilterBtnClicked] = useState(false);
    const [hasAnyFilter, setHasAnyFilter] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    const handleClick = (e)=>{
        e.preventDefault();
        setFilterBtnClicked(!filterBtnCliked);
    }

    const handleNameChange = (e)=>{
        setName(e.target.value);
    }

    const handleAddressChange = (e)=>{
        setAddress(e.target.value);
    }

    const handleFilterSubmit = (e)=>{
        e.preventDefault();
        // onNameFilterUpdate(name.trim());
        // onAddressFilterUpdate(address.trim());

        onFiltersUpdate(name.trim(), address.trim());
    }

    // console.log("name : " + name + " address : " + address);

    return (
        <div className='filter_section flex flex-col items-center'>
            {/* <h1 className='text-xl p-2'>Slogan</h1> */}
            <form className='filter_form flex justify-center rounded-full px-8 m-3' action="" >
                <div className='filter_form_items flex flex-col gap-x-5 items-start'>
                    <label className='filter_label' htmlFor="filter_nom_espace">Nom de l'espace</label>
                    <input className='filter_input' id='filter_nom_espace' type="text" placeholder="Entrer un nom" onChange={handleNameChange}/>
                </div>
                <div className='filter_form_items flex flex-col items-start'>
                    <label className='filter_label' htmlFor="filter_addresse">Adresse</label>
                    <input className='filter_input' id='filter_addresse' type="text" placeholder="Entrer une adresse" onChange={handleAddressChange}/>
                </div>
                <div className='filter_form_items flex flex-col items-start'>
                    <label className='filter_label' htmlFor="filter_date">Date</label>
                    <input type="date" id='filter_date'/>
                </div>
                <div className='filter_form_btn flex justify-center items-center px-2'>
                    <button className="filter_form_btn_link" onClick={handleFilterSubmit} >
                        <IoSearchCircle className='size-12'/>
                    </button>
                </div>
            </form>

            <div className='filter_btn_container flex justify-center items-center m-3'>
                <a  className='filter_btn flex gap-2 items-center px-3 py-1 rounded-full' 
                    href=""
                    onClick={handleClick} 
                >
                    <p>Afficher tous les filtres</p>
                    <FiFilter />
                </a>
            </div>
            
            {/* Tous les filtres */}
            {filterBtnCliked && <FiltersExtra />}

            <div className='flex justify-center gap-10 m-3'>
                <ul className='flex justify-center gap-8'>
                    <li>
                        <a className='filter_icons flex flex-col items-center' href="">
                            <LuSchool2 />
                            <p>Université</p>
                        </a>
                    </li>
                    <li>
                        <a className='filter_icons flex flex-col items-center' href="">
                            <IoLibraryOutline />
                            <p>Bibliothèque</p>
                        </a>
                    </li>
                    <li>
                        <a className='filter_icons flex flex-col items-center' href="">
                            <VscCoffee />
                            <p>Café</p>
                        </a>
                    </li>
                    <li>
                        <a className='filter_icons flex flex-col items-center' href="">
                            <MdOutlinePark />
                            <p>Parc</p>
                        </a>
                    </li>
                    <li>
                        <a className='filter_icons flex flex-col items-center' href="">
                            <MdOutlineCottage />
                            <p>Chalet</p>
                        </a>
                    </li>
                </ul>
            </div>

            {/* Filter tags */}
            {hasAnyFilter && <FilterTags/>}
        </div>
    );
}

