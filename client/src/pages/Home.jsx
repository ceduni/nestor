import React, {useEffect, useState} from 'react';
import Filters from '../components/Filters';
import Cards from '../components/Cards';
import { fetchAllSpaces } from '../apis/spaces-api';

export default function Home() {
    const [filters, setFilters] = useState({
        name: "",
        address: "",
        peopleNum: 0,
    })
    const [allSpaces, setAllSpaces] = useState([]);
    
    // api : fetch all spaces
    useEffect(()=>{
        const fetchSpacesData = async ()=>{
            try{
                const spacesData = await fetchAllSpaces();
                setAllSpaces(spacesData);
            }catch(err){
                console.error(err);
            }
        }

        fetchSpacesData();
    }, []);

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

