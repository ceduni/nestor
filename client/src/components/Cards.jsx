import React, { useEffect, useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import Card from './Card';
import CardDetail from './CardDetail';
import { LuRefreshCw } from "react-icons/lu";

export default function Cards({allSpaces, filters}) {
    // States
    const [cardSelected, setCardSelected] = useState(false);
    const [spaces, setSpaces] = useState([]);
    const [detailSelected, setDetailSelected] = useState({});
    const [onlyCards, setOnlyCards] = useState(false);

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

    // const filtering2 = (filters)=>{
    //     const filtersValues = Object.values(filters);
    //     console.log(filtersValues);
    //     const spaces = allSpaces.filter(space =>{
    //         const spaceValues = Object.values(space);
    //         console.log(spaceValues);
    //         for (let val in filtersValues){
    //             if(val in spaceValues){
    //                 return true;
    //             }
    //         }
    //         return false;
    //     })
    // }
    // filtering2(filters);

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

    const handleRefreshClick = (e)=>{
        e.preventDefault();
        setCardSelected(false);
        setDetailSelected({});
        console.log(cardSelected);
        console.log(detailSelected);
    }

    return (
    <>
        <div className='flex justify-center items-center'>
            <p className='text-center p-3'>{spaces.length} espaces trouvés</p>
            <button className='border p-1 rounded' onClick={handleRefreshClick}><LuRefreshCw /></button>
        </div>
        <section className='grid grid-cols-3 xl:grid-cols-4 place-content-center px-5'>
            <div className={cardSelected ?  
                            'cards overflow-auto scrollbar-hidden grid grid-cols-1 gap-y-4 py-5 col-span-1 place-items-center' 
                            :
                            'cards overflow-auto scrollbar-hidden grid grid-cols-1 gap-y-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 py-5 col-span-4 place-items-center' }
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
            <div className='card_detail overflow-auto flex justify-center items-start md:col-span-2 xl:col-span-3 pr-5 py-5'>
                {cardSelected ? <CardDetail spaceDetail={detailSelected}/> : <></>}
            </div>
        </section>
    </>
    );
}