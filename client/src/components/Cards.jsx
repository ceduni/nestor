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
        {
            imgSrc : "https://images.unsplash.com/photo-1600431521340-491eca880813?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxpYnJhcnl8ZW58MHx8MHx8fDA%3D",
            name: "Space name 7",
            address: "Spaces address 7",
            status: "Available",
            peopleNum: "6",
            logoSrc: ""
        },
        {
            imgSrc : "https://images.unsplash.com/photo-1600431521340-491eca880813?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxpYnJhcnl8ZW58MHx8MHx8fDA%3D",
            name: "Space name 8",
            address: "Spaces address 8",
            status: "Available",
            peopleNum: "6",
            logoSrc: ""
        },
        {
            imgSrc : "https://images.unsplash.com/photo-1600431521340-491eca880813?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxpYnJhcnl8ZW58MHx8MHx8fDA%3D",
            name: "Space name 9",
            address: "Spaces address 9",
            status: "Available",
            peopleNum: "6",
            logoSrc: ""
        },
        {
            imgSrc : "https://images.unsplash.com/photo-1600431521340-491eca880813?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxpYnJhcnl8ZW58MHx8MHx8fDA%3D",
            name: "Space name 10",
            address: "Spaces address 10",
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
        <section className='grid grid-cols-3 px-0'>
            <div className={cardSelected ?  
                            'cards h-1/3 overflow-auto scrollbar-hidden grid grid-cols-1 gap-5 px-10 py-5' 
                            :
                            'cards h-1/2 overflow-auto scrollbar-hidden grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-10 py-5 col-span-3' }
            >   
                {spaces.map((item) => (
                    <Card
                        space={item}
                        cardSelected={cardSelected}
                        onCardClick={handleCardClick}
                    />
                ))}
            </div>
            <div className='card_detail h-1/3 overflow-auto flex justify-center items-start col-span-2 px-10 py-5'>
                {cardSelected ? <CardDetail spaceDetail={detailSelected}/> : <></>}
            </div>
        </section>
    );
}