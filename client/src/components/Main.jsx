import React, { useState } from 'react';
import Filters from './Filters';
import Cards from './Cards';

export default function Main() {
    return (
        <main>
            <Filters />
            <Cards />
        </main>
    );
}