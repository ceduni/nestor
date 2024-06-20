import React from 'react';
import { LuSchool2 } from "react-icons/lu";
import { IoSearchCircle, IoLibraryOutline } from "react-icons/io5";
import { VscCoffee } from "react-icons/vsc";
import { MdOutlinePark } from "react-icons/md";
import { MdOutlineCottage } from "react-icons/md";
import { FiFilter } from "react-icons/fi";

export default function Filters() {
    return (
        <div className=''>
            <section className=''>
                <h1 className='text-xl text-center'>Slogan</h1>
                <form className='flex justify-center' action="">
                    <div className='flex flex-col items-center'>
                        <label htmlFor="">Nom de l'espace</label>
                        <input type="text" placeholder="Entrer un nom"/>
                    </div>
                    <div className='flex flex-col items-center'>
                        <label htmlFor="">Adresse</label>
                        <input type="text" placeholder="Entrer une adresse"/>
                    </div>
                    <div className='flex flex-col items-center'>
                        <label htmlFor="">Date</label>
                        <input type="date" />
                    </div>
                    <div>
                        <a href="">
                            <IoSearchCircle className='size-10'/>
                        </a>
                    </div>
                </form>
                <div className='flex justify-center gap-10'>
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
                    <a className='flex gap-2 items-center' href="">
                        <p>Filtres</p>
                        <FiFilter />
                    </a>
                </div>
            </section>
        </div>
    );
}

