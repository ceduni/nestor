import React from 'react';
import {v4 as uuidv4} from 'uuid';
import { LuSchool2 } from "react-icons/lu";
import { IoLibraryOutline } from "react-icons/io5";
import { VscCoffee } from "react-icons/vsc";
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
    {name : SlScreenDesktop, title: "Écran"},
    {name : TfiBlackboard, title: "Tableau"},
    {name : BsPlug, title: "Prise"},
    {name : BsProjector, title: "Projecteur"},
    {name : FaWifi, title: "Wifi"},
]

export default function FiltersIcons() {
    return (
        <div className='flex justify-center gap-10 m-3'>
                <ul className='flex justify-center gap-8'>
                    {icons.map((icon)=>{
                        const IconComponent = icon.name;
                        return (
                        <li key={uuidv4()}>
                            <a className='filter_icons flex flex-col items-center gap-y-2 opacity-70' href="">
                                <IconComponent className='size-6'/>
                                <p className='text-sm'>{icon.title}</p>
                            </a>
                        </li>);
                    })}
                </ul>
            </div>
    );
}

