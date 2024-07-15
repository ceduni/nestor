import React, {useEffect, useState} from "react";
export default function DropDown({allAddresses, filters, setFilters, hasClickedOutsideAddress}) {
    const [filteredAddresses, setFilteredAddresses] = useState([]);

    // Custom sorting function
    function customSort(a, b) {
        // First compare by street in descending order
        if (a.street > b.street) {
            return 1;
        } else if (a.street < b.street) {
            return -1;
        } else {
            // If streets are equal, compare by state
            if (a.state < b.state) {
                return 1;
            } else if (a.state > b.state) {
                return -1;
            } else {
                // If states are equal, compare by city in ascending order
                if (a.city < b.city) {
                    return 1;
                } else if (a.city > b.city) {
                    return -1;
                } else {
                    return 0; // They are exactly equal
                }
            }
        }
    }

    useEffect(() => {
        const temp = []
        allAddresses.some(address => {
            const exists = temp.some(item => (
                item.city === address.city && item.state === address.state
            ));
            if(!exists && (address.city.toLowerCase().includes(filters.address.toLowerCase().trim())
                || address.state.toLowerCase().includes(filters.address.toLowerCase().trim()))) {
                temp.push({
                    street: "",
                    city: address.city,
                    state: address.state
                })
            }
            if(address.state.toLowerCase().includes(filters.address.toLowerCase().trim())
                || address.city.toLowerCase().includes(filters.address.toLowerCase().trim())
                || address.street.toLowerCase().includes(filters.address.toLowerCase().trim())) {
                temp.push({
                    street: address.street,
                    city: address.city,
                    state: address.state
                });
            }
            return temp.length === 5;
        });
        setFilteredAddresses(temp);
    }, [filters.address]);


    const handleItemClick = (e) => {
        setFilters({...filters, address: e.target.textContent});
    }

    return (
        <div id="dropdown" className={`right-[445px] z-10 top-[72px] p-3 gap-4 flex flex-col bg-white absolute rounded-lg border w-80 ${!filters.address.trim() 
        || filteredAddresses.length === 0 || hasClickedOutsideAddress ? 'invisible': ''}`}>
            {[].concat(filteredAddresses).sort(customSort).map((address, index) => (
                <div key={index} className="text-sm hover:font-semibold hover:transition-[font-weight] hover:duration-300"
                onClick={handleItemClick}>
                    {`${address.street ? `${address.street}, ` : ''}${address.city}, ${address.state}`}
                </div>
            ))}
        </div>
    );
}