import React, { useEffect, useState } from 'react';
import FiltersDefault from './FiltersDefault';
import FiltersExtra from './FiltersExtra';
import FiltersTags from './FiltersTags';

export default function Filters() {
    const [filterBtnCliked, setFilterBtnClicked] = useState(true);
    const [hasAnyFilter, setHasAnyFilter] = useState(true);
    
    return (
        <div className='filters p-2'>
            <FiltersDefault />
            {filterBtnCliked && <FiltersExtra />}
            {hasAnyFilter && <FiltersTags />}
        </div>
    );
}

