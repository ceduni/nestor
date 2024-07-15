import React, {useEffect, useState} from 'react';
import Filters from '../components/Filters';
import Cards from '../components/Cards';
import {useQuery} from '@tanstack/react-query';
import { getSpaces } from '../apis/spaces-api';

export default function Home() {
    const [filters, setFilters] = useState({
        name: "",
        address: "",
        peopleNum: 0,
    })

    const {data:allSpaces, error, isLoading} = useQuery({
        queryKey : ['spaces'],
        queryFn : getSpaces,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching spaces: {error.message}</div>;
    }
    // const [allSpaces, setAllSpaces] = useState([]);
    
    // // api : fetch all spaces
    // useEffect(()=>{
    //     const fetchSpacesData = async ()=>{
    //         try{
    //             const spacesData = await getSpaces();
    //             setAllSpaces(spacesData);
    //         }catch(err){
    //             console.error(err);
    //         }
    //     }

    //     fetchSpacesData();
    // }, []);

    const handleNameFilter = (name) => {
        setNameFilter(name);
    }

    const handleAddressFilter = (address) => {
        setAddressFilter(address);
    }

    const handleFilters = (newName, newAddress, newPeopleNum)=>{
        setFilters({...filters, name : newName, address : newAddress, peopleNum: newPeopleNum})
    }

    return (
        <main>
            <section className='filters p-2'>
                <Filters 
                    onFiltersUpdate={handleFilters}
                />
            </section>

            <Cards 
                allSpaces={allSpaces} 
                filters={filters}
            />
        </main>
    );
}

