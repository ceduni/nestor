import React, {useEffect, useState} from 'react';
import Filters from '../components/Filters';
import Cards from '../components/Cards';

export default function Home() {
    const [filters, setFilters] = useState({
        name: "",
        address: "",
    })
    const [allSpaces, setAllSpaces] = useState([]);
    
    useEffect(()=>{
        fetchAllSpaces();
    }, []);

    const fetchAllSpaces = ()=>{
        fetch('http://localhost:3000/api/v1/spaces/')
        .then(res => {
          return res.json();
        })
        .then(data => {
          setAllSpaces(data);
        })
        .catch(error => console.error(error));
    }

    const handleNameFilter = (name) => {
        setNameFilter(name);
    }

    const handleAddressFilter = (address) => {
        setAddressFilter(address);
    }

    const handleFilters = (newName, newAddress)=>{
        setFilters({...filters, name : newName, address : newAddress})
    }

    // console.log(filters.name + " & " + filters.address);

    return (
        <main>
            <section className='filters p-2'>
                <Filters 
                    onNameFilterUpdate={handleNameFilter} 
                    onAddressFilterUpdate={handleAddressFilter}
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

