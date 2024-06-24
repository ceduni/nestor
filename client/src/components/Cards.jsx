import React, { useEffect, useState } from 'react';
import Card from './Card';
import CardDetail from './CardDetail';

export default function Cards() {
    // States
    const [cardSelected, setCardSelected] = useState(false);
    const [spaces, setSpaces] = useState([
        {
            imgSrc : "https://images.unsplash.com/photo-1600431521340-491eca880813?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxpYnJhcnl8ZW58MHx8MHx8fDA%3D",
            name: "Space name 1",
            address: "Spaces address 1",
            status: "Available",
            peopleNum: "4",
            logoSrc: ""
        },
        {
            imgSrc : "https://images.unsplash.com/photo-1600431521340-491eca880813?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxpYnJhcnl8ZW58MHx8MHx8fDA%3D",
            name: "Space name 2",
            address: "Spaces address 2",
            status: "Available",
            peopleNum: "6",
            logoSrc: ""
        },
        {
            imgSrc : "https://images.unsplash.com/photo-1600431521340-491eca880813?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxpYnJhcnl8ZW58MHx8MHx8fDA%3D",
            name: "Space name 3",
            address: "Spaces address 3",
            status: "Available",
            peopleNum: "6",
            logoSrc: ""
        },
        {
            imgSrc : "https://images.unsplash.com/photo-1600431521340-491eca880813?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxpYnJhcnl8ZW58MHx8MHx8fDA%3D",
            name: "Space name 4",
            address: "Spaces address 5",
            status: "Available",
            peopleNum: "6",
            logoSrc: ""
        },
        {
            imgSrc : "https://images.unsplash.com/photo-1600431521340-491eca880813?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxpYnJhcnl8ZW58MHx8MHx8fDA%3D",
            name: "Space name 5",
            address: "Spaces address 5",
            status: "Available",
            peopleNum: "6",
            logoSrc: ""
        },
        {
            imgSrc : "https://images.unsplash.com/photo-1600431521340-491eca880813?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxpYnJhcnl8ZW58MHx8MHx8fDA%3D",
            name: "Space name 6",
            address: "Spaces address 6",
            status: "Available",
            peopleNum: "6",
            logoSrc: ""
        },
    ]);
    const [detailSelected, setDetailSelected] = useState({});

    // Handles
    const handleCardClick = (isClicked, space) =>{
        if(isClicked){
            handleSelectSpaceDetail(space);
        } else {
            setCardSelected(!isClicked);
            handleSelectSpaceDetail(space);
        }
    }
    const handleSelectSpaceDetail = (space)=>{
        const spaceSelected = spaces.find((sp) => sp.name === space.name);
        console.log(spaceSelected);
        setDetailSelected(spaceSelected);
    }

    return (
        <section className='grid grid-cols-3 p-10'>
            <div className={cardSelected ?  
                            'cards h-1/6 overflow-auto scrollbar-hidden grid grid-cols-1 gap-5 pl-20 pt-20' 
                            :
                            'grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-20 py-5 col-span-3' }
            >   
                {spaces.map((item) => (
                    <Card
                        space={item}
                        cardSelected={cardSelected}
                        onCardClick={handleCardClick}
                    />
                ))}
            </div>
            <div className='card_detail h-1/6 overflow-auto flex justify-center items-start col-span-2 p-20'>
                {cardSelected ? <CardDetail spaceDetail={detailSelected}/> : <></>}
            </div>
        </section>
    );
}