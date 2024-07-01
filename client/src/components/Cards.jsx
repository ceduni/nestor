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

    // useEffect(()=>{
    //     filterByName(filters.name);
    // }, [filters.name]);

    // useEffect(()=>{
    //     filterByAddress(filters.address);
    // }, [filters.address]);

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
                console.log("how");
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

    // const filterByName = (nameFilter) =>{
    //     if(nameFilter === "") {
    //         setSpaces(allSpaces);
    //     } else {
    //         setSpaces(allSpaces.filter((space) => (space.name.toLowerCase().includes(filters.name.toLowerCase()) )));
    //     }
    // }

    // const filterByAddress = (addressFilter) =>{
    //     if(addressFilter === "") {
    //         setSpaces(allSpaces);
    //     } else {
    //         setSpaces(allSpaces.filter((space) => (space.organisation.toLowerCase().includes(filters.address.toLowerCase()) )));
    //     }
    // }

    return (
    <>
        <p className='text-center p-3'>{spaces.length} espaces trouvés</p>
        <section className='grid grid-cols-3 px-0'>
            <div className={cardSelected ?  
                            'cards h-1/3 overflow-auto scrollbar-hidden grid grid-cols-1 gap-5 px-10 py-5' 
                            :
                            'cards h-1/2 overflow-auto scrollbar-hidden grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-10 py-5 col-span-3' }
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
            <div className='card_detail h-1/3 overflow-auto flex justify-center items-start col-span-2 px-10 py-5'>
                {cardSelected ? <CardDetail spaceDetail={detailSelected}/> : <></>}
            </div>
        </section>
    </>
    );
}