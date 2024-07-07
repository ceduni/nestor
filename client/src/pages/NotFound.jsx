import React from 'react';

export default function NotFound() {
    return (
        <div className='flex flex-col justify-center items-center gap-3'>
            <p className='text-5xl'>Oops!!</p>
            <p className='text-xl'>404 - PAGE NON TROUVÉE</p>
            <p>La page que vous recherchez a peut-être été supprimée, son nom a changé ou elle est temporairement indisponible.</p>
            <Link to='/'>ALLER À LA PAGE D'ACCUEIL</Link>
        </div>
    );
}

