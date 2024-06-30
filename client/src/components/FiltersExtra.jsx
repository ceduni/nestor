import React from 'react';

export default function FiltersExtra() {
    const handleEquipChange = (e)=>{
        if(e.target.checked){
            console.log("Extras : " + e.target.closest('div').querySelector('label').textContent);
            e.preventDefault();
        }
    }
    return (
        <div>
            <h3>Équipements</h3>
            <form className='flex flex-col'>
                <div>
                    <input type="checkbox" name="ecran_filter" id="ecran_filter" onChange={handleEquipChange}/>
                    <label htmlFor="ecran_filter">Écran</label>
                </div>

                <div>
                    <input type="checkbox" name="tableau_blanc_filter" id="tableau_blanc_filter" />
                    <label htmlFor="tableau_blanc_filter">Tableau blanc</label>
                </div>

                <div>
                    <input type="checkbox" nameprise_filter id="prise_filter" />
                    <label htmlFor="prise_filter">Prise</label>
                </div>
            </form>
        </div>
    );
}

