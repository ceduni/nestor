import React, {useEffect, useState} from 'react';
import Filters from '../components/Filters';
import Cards from '../components/Cards';

export default function Home() {
    const [nameFilter, setNameFilter] = useState("");
    const [allSpaces, setAllSpaces] = useState([]);
    const handleNameFilter = (name) =>{
        setNameFilter(name);
    }

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

    console.log(allSpaces);

    return (
        <main>
            <section className='filters p-2'>
                <Filters onNameFilterUpdate={handleNameFilter}/>
            </section>
            <Cards allSpaces={allSpaces} nameFilter={nameFilter}/>
        </main>
    );
}

