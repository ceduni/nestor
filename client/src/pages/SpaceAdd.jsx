import React from 'react';

export default function SpaceAdd() {
    return (
        <div className="flex justify-center items-center">
            <div className="signup_container flex flex-col justify-center items-center gap-5 rounded-3xl m-10 px-5 py-10 shadow-md">
                <h1 className='text-2xl font-bold'>Ajouter un espace</h1>
                <form className="flex flex-col gap-3">
                    <div className='flex flex-col'>
                        <label htmlFor="space_images_input" className='font-bold'>Images</label>
                        <input
                            id="space_images_input"
                            name='images'
                            className="spaceadd_input border"
                            type="file"
                            placeholder="Enter le code postal"
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="space_name" className='font-bold'>Nom</label>
                        <input
                            id="space_name"
                            name='name'
                            className="spaceadd_input border"
                            type="text"
                            placeholder="Enter le nom d'espace"
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="space_street" className='font-bold'>Rue</label>
                        <input
                            id="space_street"
                            name='street'
                            className="spaceadd_input border"
                            type="text"
                            placeholder="Enter la rue"
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="space_city" className='font-bold'>Ville</label>
                        <input
                            id="space_city"
                            name='city'
                            className="spaceadd_input border"
                            type="text"
                            placeholder="Enter la ville"
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="space_state" className='font-bold'>Province</label>
                        <input
                            id="space_state"
                            name='state'
                            className="spaceadd_input border"
                            type="text"
                            placeholder="Enter la province"
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="space_postalcode" className='font-bold'>Code postal</label>
                        <input
                            id="space_postalcode"
                            name='postalCode'
                            className="spaceadd_input border"
                            type="text"
                            placeholder="Enter le code postal"
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="space_capacity" className='font-bold'>Nombre de peronnes disponible</label>
                        <input
                            id="space_capacity"
                            name='capacity'
                            className="spaceadd_input border"
                            type="number"
                            placeholder="Enter le code postal"
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="space_postalcode" className='font-bold'>Code postal</label>
                        <input
                            id="space_postalcode"
                            name='postalCode'
                            className="spaceadd_input border"
                            type="text"
                            placeholder="Enter le code postal"
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="space_invitation_availability" className='font-bold'>Disponibilité des invitations</label>
                        <select
                            id="space_invitation_availability"
                            name='isAvailable'
                            className="spaceadd_input border"
                            >
                            <option value="Étudiant">Disponible</option>
                            <option value="Administrateur">Non disponible</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="space_description" className='font-bold'>Description</label>
                        <input
                            id="space_description"
                            name='description'
                            className="spaceadd_input border"
                            type="text"
                            placeholder="Enter la description de l'espace"
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="space_organisation" className='font-bold'>Organisation</label>
                        <input
                            id="space_organisation"
                            name='organisation'
                            className="spaceadd_input border"
                            type="text"
                            placeholder="Enter le nom de l'organisation"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

