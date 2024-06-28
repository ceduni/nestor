import React from 'react';

export default function Card({space, cardSelected, onCardClick}) {
    const {imgSrc, name, address, peopleNum, status, logoSrc} = space;
    const handleClick = (e)=>{
        e.preventDefault();
        console.log(e.target);
        onCardClick(cardSelected, space);
    }
    return (
        <a className='card rounded-xl flex flex-col' href="" onClick={handleClick}>
            <img className='rounded-xl' src={imgSrc} alt="space photo" />
            <div className='p-5'>
                <h1>{name}</h1>
                <p>{address}</p>
                <p>{peopleNum}</p>
                <p>{status}</p>
                <img className='text-center' src={logoSrc} alt="logo" />
            </div>
        </a>  
    );
}

