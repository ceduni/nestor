import React from 'react';

export default function CardDetail({spaceDetail}) {
    const handleClick = (e)=>{
        e.preventDefault();
    }
    return (
        <a className='w-full card_detail rounded-xl flex flex-col' href="" onClick={handleClick}>
            {/* <div className='grid grid-cols-2 grid-rows-2 gap-3 rounded-full'> */}
            <div 
                className={
                    spaceDetail.images && spaceDetail.images.length > 0  && spaceDetail.images.length < 2? 
                        "grid grid-cols-2 gap-3 rounded-full": 
                        "grid grid-cols-2 gap-3 rounded-full"
                }>
                {spaceDetail.images.map((image)=>(
                    <img className='w-full h-44' src={image.url} alt="space image" />
                ))}
            </div>
            <ul className='p-5'>
                <li>{spaceDetail.name}</li>
                <li>{spaceDetail.organisation}</li>
                <li>{spaceDetail.capacity} personnes</li>
                <li>{spaceDetail.description}</li>
            </ul>
        </a>  
    );
}