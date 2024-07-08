import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import { LuSchool2, LuMicroscope } from "react-icons/lu";
import { IoLibraryOutline } from "react-icons/io5";
import { VscCoffee } from "react-icons/vsc";
import { CiMusicNote1 } from "react-icons/ci";
import { MdOutlinePark } from "react-icons/md";
import { SlScreenDesktop } from "react-icons/sl";
import { TfiBlackboard } from "react-icons/tfi";
import { BsPlug, BsProjector } from "react-icons/bs";
import { FaWifi } from "react-icons/fa6";

const icons = [
    {name : LuSchool2, title: "Université"}, 
    {name : IoLibraryOutline, title: "Bibliothèque"}, 
    {name : VscCoffee, title: "Café"},
    {name : MdOutlinePark, title: "Nature"},
    {name : LuMicroscope, title: "Laboratoire"},
    {name : CiMusicNote1, title: "Musique"},
    {name : SlScreenDesktop, title: "Écran"},
    {name : TfiBlackboard, title: "Tableau"},
    {name : BsPlug, title: "Prise"},
    {name : BsProjector, title: "Projecteur"},
    {name : FaWifi, title: "Wifi"},
]

export default function FiltersIcons({onIconClick}) {
    const [iconsSelected, setIconsSelected] = useState([]);

    const handleIconClick = (e) =>{
        e.preventDefault();
        const iconSelected = e.currentTarget.querySelector('.filter_icons_text').textContent;
        if(iconsSelected.indexOf(iconSelected) !== -1){
            setIconsSelected(iconsSelected.filter(icon => (icon !== iconSelected)));
        } else {
            setIconsSelected([...iconsSelected, iconSelected]);
        }
        onIconClick(iconsSelected);
    }
    
    return (
        <div className='flex justify-center gap-10 m-3'>
            <ul className='flex justify-center gap-6'>
                {icons.map((icon)=>{
                    const IconComponent = icon.name;
                    return (
                        <li className='filter_icons flex flex-col items-center gap-y-2 opacity-70' key={uuidv4()} onClick={handleIconClick}>
                            <IconComponent className='size-6'/>
                            <p className='filter_icons_text text-sm'>{icon.title}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

