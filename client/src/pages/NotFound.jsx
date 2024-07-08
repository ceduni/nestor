import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className='flex flex-col justify-center items-center gap-3 mt-32'>
            <p className='text-5xl'>Oops!!</p>
            <p className='text-xl'>404 - PAGE NON TROUVÉE</p>
            <p className='text-center w-2/5'>La page que vous recherchez a peut-être été supprimée, son nom a changé ou elle est temporairement indisponible.</p>
            <Link className='border p-4 rounded-full' to='/'>ALLER À LA PAGE D'ACCUEIL</Link>
        </div>
    );
}

