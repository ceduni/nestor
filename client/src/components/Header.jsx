import React, { useState } from 'react';
import { RiLoginBoxLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { GiSpellBook } from "react-icons/gi";

const defaultItems = ["À propos", "Contact"];
const adminItems = ["Mes favoris", "Gérer mes espaces", "À propos", "Contact"];
const studentItems = ["Mes favoris", "À propos", "Contact"];

export default function Header({logedIn, isAdmin}) {
    const [navItems, setNavitems] = useState(()=>selectNavItems(logedIn, isAdmin));

    return (
        <header className='header px-14 w-full flex place-content-between items-center'>
            
            {/* Nestor logo */}
            <a href="">
                <img className='size-16' src="../src/assets/logo-nestor.svg" alt="" />
            </a>

            <nav>
                <ul className='flex justify-center gap-8'>
                    
                    {/* nav items */}
                    {navItems.map((item)=>(
                        <a className='nav_items' href="">
                            <li>{item}</li>
                        </a>
                    ))}

                    {/* nav connection button */}
                    <a className='nav_items' href="">
                        <li>{logedIn? <FaRegUserCircle className='size-6'/> : <RiLoginBoxLine className='size-6'/>}</li>
                    </a> 
                </ul>
            </nav>
        </header>
    );
}

function selectNavItems(logedIn, isAdmin){
    if(logedIn == true){
        if(isAdmin == true){
            return adminItems;
        }
        else{
            return studentItems;
        }
    }
    else{
        return defaultItems;
    }
}