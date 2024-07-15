import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogIn() {
    const navigate = useNavigate();
    const handleSignupClick = ()=>{
        navigate('../connexion/signup');
    }

    return (
        <div className='flex justify-center items-center'>
            <div className='login_container flex flex-col justify-center items-center gap-5 border m-10 p-10'>
                <h1>Connexion</h1>
                <form className="login_form flex flex-col gap-3" action="">
                    <label htmlFor="">Courriel</label>
                    <input className='border' type="text" placeholder='Enter votre courriel'/>

                    <label htmlFor="">Mot de passe</label>
                    <input className='border' type="password" placeholder='Entrer votre mot de passe'/>

                    <input className='border' type="submit" value="Se connecter"/>
                    <p className='text-center'>Ou</p>
                    <input type="submit" value="Créer un compte" onClick={handleSignupClick} className='border'/>
                </form>
            </div>
        </div>
    );
}

