import React, {useEffect, useState} from 'react';
import Filters from '../components/Filters';
import Cards from '../components/Cards';

export default function Home() {
    const [nameFilter, setNameFilter] = useState("");
    const [addressFilter, setAddressFilter] = useState("");
    const [allSpaces, setAllSpaces] = useState([]);
    

    useEffect(()=>{
        fetchAllSpaces();
    }, []);

    const handleNameFilter = (name) => {
        setNameFilter(name);
    }

    const handleAddressFilter = (address) => {
        setAddressFilter(address);
    }

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

    console.log(allSpaces);

    return (
        <main>
            <section className='filters p-2'>
                <Filters 
                    onNameFilterUpdate={handleNameFilter} 
                    onAddressFilterUpdate={handleAddressFilter}
                />
            </section>

            <Cards 
                allSpaces={allSpaces} 
                nameFilter={nameFilter}
                addressFilter={addressFilter}
            />
        </main>
    );
}

