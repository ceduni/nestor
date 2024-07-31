import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [passwordComfirm, setPasswordConfirm] = useState("");
  const [signupInfo, setSignupInfo] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "Étudiant"
  });

  const handleInputsChange = (e)=>{
    console.log(e.target.value);
    const {name, value} = e.target;
    setSignupInfo(prev => prev?{
      ...prev,
      [name]: value
    }: prev);
  };
  const handleChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
    console.log(e.target.value);
  };
  const handleAnnulerClick = (e) => {
    e.preventDefault();
    navigate("../connexion/login");
  };
  const handleSignupClick = (e) => {
    e.preventDefault();
    console.log(signupInfo);
    
    if (signupInfo.password !== passwordComfirm){
      console.log("Password does not match");
      return;
    }
    // add post
  };

  return (
    <div className="flex justify-center items-center">
      <div className="signup_container flex flex-col justify-center items-center gap-5 border rounded-3xl m-10 px-5 py-10">
        <h1 className='text-2xl font-bold'>Créer un compte </h1>
        <form className="account_create_form flex flex-col gap-3">
          <label htmlFor="nom">Nom</label>
          <input
            onChange={handleInputsChange}
            id="signup_name"
            name='lastName'
            className="signup_input border"
            type="text"
            placeholder="Enter votre nom"
          />

          <label htmlFor="prenom">Prénom</label>
          <input
            onChange={handleInputsChange}
            id="prenom"
            name='firstName'
            className="signup_input border"
            type="text"
            placeholder="Entrer votre prénom"
          />

          <label htmlFor="prenom">Nom d'utilisateur</label>
          <input
            onChange={handleInputsChange}
            id="userName"
            name='userName'
            className="signup_input border"
            type="text"
            placeholder="Entrer votre nom d'utilisateur"
          />

          <label htmlFor="courriel">Courriel</label>
          <input
            onChange={handleInputsChange}
            id="courriel"
            name='email'
            className="signup_input border"
            type="email"
            placeholder="Enter votre courriel"
          />

          <label htmlFor="motdepasse">Mot de passe</label>
          <input
            onChange={handleInputsChange}
            id="motdepasse"
            name='password'
            className="signup_input border"
            type="password"
            placeholder="Entrer votre mot de passe"
          />
          <label htmlFor="confirm_mdp">Confirmation du mot de passe</label>
          <input
            onChange={handleChangePasswordConfirm}
            id="confirm_mdp"
            name='passwordConfirm'
            className="signup_input border"
            type="password"
            placeholder="Entrer votre mot de passe à nouveau"
          />

          <label htmlFor="account_type">Type du compte</label>
          <select
            onChange={handleInputsChange}
            id="account_type"
            name='role'
            className="signup_input border"
          >
            <option value="Étudiant">Étudiant</option>
            <option value="Administrateur">Administrateur</option>
          </select>

          <div className="flex justify-between mt-5">
            <input
              className="border p-2 w-20 bg-red-400 rounded"
              type="button"
              value="Annuler"
              onClick={handleAnnulerClick}
            />
            <input
              className="border p-2 w-20 bg-blue-400 rounded"
              type="button"
              value="Créer"
              onClick={handleSignupClick}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
