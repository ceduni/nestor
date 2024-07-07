import React from 'react';

export default function LogIn({onSignupClick}) {
    return (
        <div className='login_container flex flex-col justify-center items-center gap-5 border m-10 p-10'>
            <h1>Connexion</h1>
            <form className="login_form flex flex-col gap-3" action="">
                <label htmlFor="">Courriel</label>
                <input className='border' type="text" placeholder='Enter votre courriel'/>

                <label htmlFor="">Mot de passe</label>
                <input className='border' type="password" placeholder='Entrer votre mot de passe'/>

                <input className='border' type="submit" value="Se connecter"/>
                <p className='text-center'>Ou</p>
                <input className='border' type="submit" value="Créer un compte" onClick={onSignupClick}/>
            </form>
        </div>
    );
}

