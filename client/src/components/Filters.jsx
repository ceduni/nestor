import React, {useEffect, useState} from 'react';
import { IoSearchCircle } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import FiltersIcons from './FiltersIcons';
import FiltersExtra from './FiltersExtra';
import FilterTags from './FiltersTags';

export default function Filters({onNameFilterUpdate, onAddressFilterUpdate, onFiltersUpdate}) {
    const [filterBtnCliked, setFilterBtnClicked] = useState(false);
    const [hasAnyFilter, setHasAnyFilter] = useState(false);
    const [filters, setFilters] = useState({
        name: "",
        address: "",
        peopleNum: 0,
    });
    const [filterTags, setFilterTags] = useState([]);

    useEffect(()=>{
        if(filterTags.length === 0){
            setHasAnyFilter(false);
        } else {
            setHasAnyFilter(true);
        }
    }, [filterTags])

    const handleClick = (e)=>{
        e.preventDefault();
        setFilterBtnClicked(!filterBtnCliked);
    }

    const handleNameChange = (e)=>{
        setFilters(prev =>({
            ...prev,
            name: e.target.value
        }));
    }

    const handleAddressChange = (e)=>{
        setFilters(prev =>({
            ...prev,
            address: e.target.value
        }));
    }

    const handlePeopleNumChange = (e)=>{
        setFilters(prev =>({
            ...prev,
            peopleNum: e.target.value
        }));
    }

    const handleFilterSubmit = (e)=>{
        e.preventDefault();
        const filterValues = Object.values(filters);
        const tags = filterValues.filter(val => val !== '' && val !== 0);
        setFilterTags(tags);
        onFiltersUpdate(filters.name.trim(), filters.address.trim(), filters.peopleNum);
    }

    // console.log("name : " + filters.name + " address : " + filters.address);

    return (
        <div className='filter_section flex flex-col items-center'>
            {/* <h1 className='text-xl p-2'>Slogan</h1> */}
            <form className='filter_form flex justify-center rounded-full px-8 m-3' action="" onSubmit={handleFilterSubmit}>
                <div className='filter_form_items flex flex-col gap-x-5 items-start'>
                    <label className='filter_label text-base' htmlFor="filter_nom_espace">Nom de l'espace</label>
                    <input className='filter_input text-base' id='filter_nom_espace' type="text" placeholder="Entrer un nom" onChange={handleNameChange}/>
                </div>
                <div className='filter_form_items flex flex-col items-start'>
                    <label className='filter_label text-base' htmlFor="filter_addresse">Adresse</label>
                    <input className='filter_input text-base' id='filter_addresse' type="text" placeholder="Entrer une adresse" onChange={handleAddressChange}/>
                </div>
                <div className='filter_form_items flex flex-col items-start'>
                    <label className='filter_label text-base' htmlFor="filter_addresse">Nombre de personnes</label>
                    <input className='filter_input text-base' id='filter_nb_personnes' type="number" placeholder="Entrer un nombre" onChange={handlePeopleNumChange}/>
                </div>
                <div className='filter_form_items flex flex-col items-start'>
                    <label className='filter_label text-base' htmlFor="filter_date">Date</label>
                    <input className='filter_input text-base' type="date" id='filter_date'/>
                </div>
                <div className='filter_form_btn flex justify-center items-center px-2'>
                    <button className="filter_form_btn_link" >
                        <IoSearchCircle className='filter_search_icon color-red size-12'/>
                    </button>
                </div>
            </form>

            <div className='filter_btn_container flex justify-center items-center m-3'>
                <a  className='filter_btn flex gap-2 items-center px-3 py-1 rounded-full' 
                    href=""
                    onClick={handleClick} 
                >
                    <p className='text-base'>Afficher tous les filtres</p>
                    <FiFilter />
                </a>
            </div>
            
            {/* Tous les filtres */}
            {filterBtnCliked && <FiltersExtra />}

            {/* Filter tags */}
            {hasAnyFilter && <FilterTags filterTags={filterTags}/>}
            
            {/* Filters with icons*/}
            <FiltersIcons />
        </div>
    );
}

