import React, {useState} from 'react';
import LogIn from '../components/LogIn';
import SignUp from '../components/SignUp';

export default function Connexion() {
    const [isLogin, setIsLogin] = useState(true);
    const [isSignup, setIsSignup] = useState(false);

    const handleSignupClick = ()=>{
        setIsLogin(false);
        setIsSignup(true);
    }

    const handleAnnulerClick = ()=>{
        setIsLogin(true);
        setIsSignup(false);
    }

    return (
        <div className='flex justify-center items-center'>
            {isLogin && <LogIn onSignupClick={handleSignupClick}/>}
            {isSignup && <SignUp onAnnulerClick={handleAnnulerClick}/>}
        </div>
    );
}

