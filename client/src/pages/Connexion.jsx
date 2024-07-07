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

    return (
        <div className='flex justify-center items-center'>
            {isLogin && <LogIn onSignupClick={handleSignupClick}/>}
            {isSignup && <SignUp />}
        </div>
    );
}

