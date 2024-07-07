import React from 'react';
import { Link } from 'react-router-dom';

export default function AccountCreate() {
    const handleAnnulerClick = (e)=>{
        e.preventDefault();
    }
    const handleSignupClick = (e)=>{
        e.preventDefault();
    }
    return (
        <div className='account_create_container flex flex-col justify-center items-center gap-5 border m-10 p-10'>
            <h1>Créer un compte </h1>
            <form className="account_create_form flex flex-col gap-3" action="">
                <label htmlFor="nom">Nom *</label>
                <input id='nom' className='border' type="text" placeholder='Enter votre courriel'/>

                <label htmlFor="prenom">Prénom *</label>
                <input id='prenom' className='border' type="text" placeholder='Entrer votre mot de passe'/>
                
                <label htmlFor="courriel">Courriel *</label>
                <input id='courriel' className='border' type="email" placeholder='Enter votre courriel'/>
                
                <label htmlFor="motdepasse">Mot de passe *</label>
                <input id='motdepasse' className='border' type="password" placeholder='Entrer votre mot de passe'/>
                <label htmlFor="confirm_mdp">Confirmation du mot de passe *</label>
                <input id='confirm_mdp' className='border' type="password" placeholder='Entrer votre mot de passe'/>
                
                <div className='flex justify-between'>
                    <input className='border p-1' type="submit" value="Annuler" onClick={handleAnnulerClick}/>
                    <input className='border p-1' type="submit" value="Créer" onClick={handleSignupClick}/>
                </div>
            </form>
        </div>
    );
}

