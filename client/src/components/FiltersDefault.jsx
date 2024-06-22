import React, {useState} from 'react';
import { LuSchool2 } from "react-icons/lu";
import { IoSearchCircle, IoLibraryOutline } from "react-icons/io5";
import { VscCoffee } from "react-icons/vsc";
import { MdOutlinePark } from "react-icons/md";
import { MdOutlineCottage } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import FiltersExtra from './FiltersExtra';
import FilterTags from './FiltersTags';

export default function FiltersDefault() {
    const [filterBtnCliked, setFilterBtnClicked] = useState(false);
    const [hasAnyFilter, setHasAnyFilter] = useState(false);
    const handleClick = (e)=>{
        e.preventDefault();
        setFilterBtnClicked(!filterBtnCliked);
    }
    return (
        <div className='filter_section flex flex-col items-center'>
            <h1 className='text-xl p-2'>Slogan</h1>
            <form className='filter_form flex justify-center rounded-full px-8 m-3' action="">
                <div className='filter_form_items flex flex-col gap-x-5 items-start'>
                    <label className='filter_label' htmlFor="">Nom de l'espace</label>
                    <input className='filter_input' type="text" placeholder="Entrer un nom"/>
                </div>
                <div className='filter_form_items flex flex-col items-start'>
                    <label className='filter_label' htmlFor="">Adresse</label>
                    <input className='filter_input' type="text" placeholder="Entrer une adresse"/>
                </div>
                <div className='filter_form_items flex flex-col items-start'>
                    <label className='filter_label' htmlFor="">Date</label>
                    <input type="date" />
                </div>
                <div className='filter_form_btn flex justify-center items-center px-2'>
                    <a className="filter_form_btn_link" href="">
                        <IoSearchCircle className='size-12'/>
                    </a>
                </div>
            </form>
            <div className='flex justify-center gap-10 mx-2'>
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
                <div className='filter_btn_container flex justify-center items-center'>
                    <a  className='filter_btn flex gap-2 items-center px-3 py-1 rounded-full' 
                        href=""
                        onClick={handleClick} 
                    >
                        <p>Tous les filtres</p>
                        <FiFilter />
                    </a>
                </div>
            </div>

            {/* Tous les filtres */}
            {filterBtnCliked && <FiltersExtra />}

            {/* Filter tags */}
            {hasAnyFilter && <FilterTags/>}
        </div>
    );
}

