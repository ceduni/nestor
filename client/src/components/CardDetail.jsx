import React from 'react';

export default function CardDetail({spaceDetail}) {
    const handleClick = (e)=>{
        e.preventDefault();
    }
    return (
        <a className='w-full card_detail rounded-xl flex flex-col' href="" onClick={handleClick}>
            <img className='rounded-xl' src="https://images.unsplash.com/photo-1600431521340-491eca880813?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxpYnJhcnl8ZW58MHx8MHx8fDA%3D" alt="space photo" />
            <ul className='p-5'>
                <li>{spaceDetail.name}</li>
                <li>Space Address</li>
                <li>6 personnes</li>
                <li>{spaceDetail.description}</li>
            </ul>
        </a>  
    );
}