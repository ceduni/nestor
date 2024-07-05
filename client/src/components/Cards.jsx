import React, { useEffect, useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import Card from './Card';
import CardDetail from './CardDetail';

export default function Cards({allSpaces, filters}) {
// console.log(filters);
    // States
    const [cardSelected, setCardSelected] = useState(false);
    const [spaces, setSpaces] = useState([]);
    const [detailSelected, setDetailSelected] = useState({});

    // effects
    useEffect(()=>{
      setSpaces(allSpaces);
    }, [allSpaces]);

    useEffect(()=>{
        filtering(filters);
    }, [filters]);


    const filtering = (filters) =>{
        if(filters.name === "" && filters.address === ""){
            setSpaces(allSpaces);
        } else {
            if(filters.name && filters.address === ""){
                setSpaces(allSpaces.filter((space) => (space.name.toLowerCase().includes(filters.name.toLowerCase()) )));
            } else if(filters.name === "" && filters.address){
                setSpaces(allSpaces.filter((space) => (space.organisation.toLowerCase().includes(filters.address.toLowerCase()) )));
            } else {
                setSpaces(allSpaces.filter((space) => (
                    space.name.toLowerCase().includes(filters.name.toLowerCase()) ||
                    space.organisation.toLowerCase().includes(filters.address.toLowerCase()) 
                )));
            }
        }
    }

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
        setDetailSelected(spaceSelected);
    }

    return (
    <>
        <p className='text-center p-3'>{spaces.length} espaces trouvés</p>
        <section className='grid grid-cols-3 xl:grid-cols-4 px-0'>
            <div className={cardSelected ?  
                            'cards overflow-auto scrollbar-hidden grid grid-cols-1 gap-4 px-20 py-5 col-span-1' 
                            :
                            'cards overflow-auto scrollbar-hidden grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 pl-5 py-5 col-span-4' }
            >   
                {spaces.map((item) => (
                    <Card
                        key={uuidv4()}
                        space={item}
                        cardSelected={cardSelected}
                        onCardClick={handleCardClick}
                    />
                ))}
            </div>
            <div className='card_detail overflow-auto flex justify-center items-start col-span-3 pr-10 py-5'>
                {cardSelected ? <CardDetail spaceDetail={detailSelected}/> : <></>}
            </div>
        </section>
    </>
    );
}