import React, {useEffect, useState} from 'react';

export default function TimeAvailability({index, onDeleteAvailability, onUpdateAvailabilities}) {
    const [availability, setAvailability] = useState({
        startAt: '', endAt: ''
    });

    useEffect(()=>{
        onUpdateAvailabilities(index, availability);
    }, [availability]);

    const handleAvailInputChange = (e)=>{
        const {name, value} = e.target;
        setAvailability(prev => prev ? {
            ...prev,
            [name]: value
        } : prev);
    }
    const handleAvailDeleteClick = (e)=>{
        e.preventDefault();
        onDeleteAvailability(index);
    }
    
    return (
        <div  className={`flex items-center justify-between pl-2`}>
            <div className='flex items-center gap-x-2'>
                <label htmlFor="space_available_starttime">Début</label>
                <input
                    id="space_available_starttime"
                    name='startAt'
                    className={`border w-40 h-8 p-1`}
                    type="time"
                    onChange={handleAvailInputChange}
                />
            </div>
            <p>-----</p>
            <div className='flex items-center gap-x-2'>
                <label htmlFor="space_available_endtime">Fin</label>
                <input
                    id="space_available_endtime"
                    name='endAt'
                    className="border w-40 h-8 p-1"
                    type="time"
                    onChange={handleAvailInputChange}
                />
            </div>
            <button onClick={handleAvailDeleteClick} className='border w-8 h-8 rounded font-bold'>-</button>
        </div>
    );
}