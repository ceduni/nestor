import React from 'react';
import { CgOrganisation } from "react-icons/cg";
import { MdOutlineSubtitles } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";

export default function Card({space, cardSelected, onCardClick}) {
    const {images, name, organisation, capacity} = space;
    const handleClick = (e)=>{
        e.preventDefault();
        onCardClick(cardSelected, space);
    }
    return (
        <a className='card rounded-lg flex flex-col' href="" onClick={handleClick}>
            <div className='card_img_container'>
                <img className='card_img rounded-lg z-0' src={images[0].url} alt="space photo" />
            </div>
            <div className=''>
                <p className='text-base font-bold flex items-center gap-2'><MdOutlineSubtitles />{name}</p>
                <p className='text-base flex items-center gap-2'><CgOrganisation />{organisation}</p>
                <p className='text-base flex items-center gap-2'><IoPeopleOutline />{capacity} {capacity > 1 ? "personnes" : "personne"}</p>
            </div>
        </a>  
    );
}

