import React from 'react';
import {v4 as uuidv4} from 'uuid';
import { CgOrganisation } from "react-icons/cg";
import { MdOutlineSubtitles, MdOutlineDescription } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";

export default function CardDetailDescription({spaceDetail}) {
    return (
        <ul className='py-5'>
            <li className='font-bold flex items-center gap-2'><MdOutlineSubtitles />{spaceDetail.name}</li>
            <li className='flex items-center gap-2'><CgOrganisation />{spaceDetail.organisation}</li>
            <li className='flex items-center gap-2'><IoPeopleOutline />{spaceDetail.capacity} personnes</li>
            <li className='flex items-center gap-2'><MdOutlineDescription />{spaceDetail.description}</li>
                {spaceDetail.features.map(equip => (
                    <li className='flex items-center gap-2' key={uuidv4()}>{equip}</li>
                ))}
        </ul>
    );
}

