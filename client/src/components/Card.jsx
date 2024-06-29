import React from 'react';

export default function Card({space, cardSelected, onCardClick}) {
    const {image, name, organisation, capacity, isAvailable} = space;
    const handleClick = (e)=>{
        e.preventDefault();
        onCardClick(cardSelected, space);
    }
    return (
        <a className='card rounded-xl flex flex-col' href="" onClick={handleClick}>
            {/* <img className='rounded-xl' src={image} alt="space photo" /> */}
            <img className='rounded-xl' src="https://images.unsplash.com/photo-1600431521340-491eca880813?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxpYnJhcnl8ZW58MHx8MHx8fDA%3D" alt="space photo" />
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

