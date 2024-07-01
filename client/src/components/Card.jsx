import React from 'react';

export default function Card({space, cardSelected, onCardClick}) {
    console.log(space.images);
    const {images, name, organisation, capacity, isAvailable} = space;
    const handleClick = (e)=>{
        e.preventDefault();
        onCardClick(cardSelected, space);
    }
    return (
        <a className='card max-h-80 rounded-xl flex flex-col' href="" onClick={handleClick}>
            <img className='h-1/2 object-cover rounded-xl' src={space.images[0].url} alt="space photo" />
            <div className='p-5'>
                <h1>{name}</h1>
                <p>{organisation}</p>
                <p>{capacity}</p>
                {isAvailable ? <p>Available</p> : <p>Not available</p>}
                {/* <img className='text-center' src={logoSrc} alt="logo" /> */}
            </div>
        </a>  
    );
}

