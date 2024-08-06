import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";


export default function MultiCheckBoxes({title, boxItems, onUpdateList}) {
    const [items, setItems] = useState([]);

    useEffect(()=>{
        onUpdateList(items);
    }, [items]);

    const handleInputChange = (e)=>{
        const name = e.target.name;
        if(e.target.checked){
            setItems(prev => [...prev, name]);
        } else {
            setItems(items.filter(item => item !== name));
        }
    }
    
    return (
        <div className='flex flex-col gap-y-2'>
            <label htmlFor="prise" className='font-bold'>{title}</label>
            <fieldset className='flex flex-wrap gap-x-4 pl-2'>
                {boxItems.map(item => (
                    <div key={uuidv4()} className='flex gap-1'>
                        <input
                            id="prise"
                            name={item.name}
                            className="border"
                            type="checkbox"
                            onChange={handleInputChange}
                        />
                        <label htmlFor="prise">{item.label}</label>
                    </div>
                ))}
            </fieldset>
        </div>
    );
}