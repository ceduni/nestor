import React, { useState } from 'react';
import Filters from './Filters';
import Cartes from './Cartes';

export default function Main() {
    return (
        <main>
            <Filters />
            <Cartes />
        </main>
    );
}