import React from 'react';


export default function LogIn() {
    return (
        <div className='flex flex-col justify-center items-center gap-5 h-96'>
            <h1>Connexion</h1>
            <form className="flex flex-col gap-2" action="">
                <label htmlFor="">Courriel</label>
                <input type="text" placeholder='Enter votre courriel'/>

                <label htmlFor="">Mot de passe</label>
                <input type="password" placeholder='Entrer votre mot de passe'/>

                <input type="submit" value="Se connecter"/>
                <input type="submit" value="Créer un compte"/>
            </form>
        </div>
    );
}

