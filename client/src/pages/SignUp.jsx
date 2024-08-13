import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function SignUp() {
  const navigate = useNavigate();
  const [isShowBtnFstClick, setIsShowBtnFstClick] = useState(false);
  const [isShowBtnSndClick, setIsShowBtnSndClick] = useState(false);
  const [passwordComfirm, setPasswordConfirm] = useState("");
  const [signupInfo, setSignupInfo] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleInputsChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setSignupInfo((prev) =>
      prev
        ? {
            ...prev,
            [name]: value,
          }
        : prev,
    );
  };
  const handleChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
    console.log(e.target.value);
  };
  const handleShowBtnFstClick = () => {
    setIsShowBtnFstClick((prev) => !prev);
  };
  const handleShowBtnSndClick = () => {
    setIsShowBtnSndClick((prev) => !prev);
  };
  const handleAnnulerClick = (e) => {
    e.preventDefault();
    navigate("../connexion/login");
  };
  const isAnyFieldEmpty = ()=>{
    return Object.values(signupInfo).some(value => value.trim() === "");
  }
  const handleSignupClick = (e) => {
    e.preventDefault();
    console.log(signupInfo);

    // Verify password
    if (signupInfo.password !== passwordComfirm) {
      console.log("Password does not match");
      return;
    }

    // check empty field
    if(isAnyFieldEmpty()){
      alert("All fields must be filled out");
      return;
    }

    // add post
    registerUser(signupInfo);
  };
  async function registerUser(userData) {
    try {
      const response = await fetch('http://localhost:3000/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to register user');
      }
  
      const data = await response.json();
      console.log('User registered:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="flex justify-center items-center">
      <div className="signup_container flex flex-col justify-center items-center gap-5 rounded-3xl m-10 px-5 py-10 shadow-md">
        <h1 className="text-2xl font-bold">Créer un compte </h1>
        <form className="account_create_form flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="signup_name" className="font-bold">
              Nom
            </label>
            <input
              onChange={handleInputsChange}
              id="signup_name"
              name="lastName"
              className="signup_input border"
              type="text"
              placeholder="Enter votre nom"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="prenom" className="font-bold">
              Prénom
            </label>
            <input
              onChange={handleInputsChange}
              id="prenom"
              name="firstName"
              className="signup_input border"
              type="text"
              placeholder="Entrer votre prénom"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="userName" className="font-bold">
              Nom d'utilisateur
            </label>
            <input
              onChange={handleInputsChange}
              id="userName"
              name="userName"
              className="signup_input border"
              type="text"
              placeholder="Entrer votre nom d'utilisateur"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="courriel" className="font-bold">
              Courriel
            </label>
            <small>Ex : exemple@gmail.com</small>
            <input
              onChange={handleInputsChange}
              id="courriel"
              name="email"
              className="signup_input border"
              type="email"
              placeholder="Enter votre courriel"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="motdepasse" className="font-bold">
              Mot de passe
            </label>
            <small>
              Votre mot de passe doit contenir au moins 10 caractères
            </small>
            <small>
              Votre mot de passe doit comprendre au moins :
              <div className="pl-3">
                <li>une lettre majuscule (a à z)</li>
                <li>une lettre minuscule (A à Z)</li>
                <li>un chiffre (0 à 9)</li>
                <li>un caractère spécial (!, @, #, $, ...)</li>
              </div>
            </small>
            <small>Ex : Motdepasse1234!!</small>
            <div className="">
              <div className="relative">
                <input
                  onChange={handleInputsChange}
                  id="motdepasse"
                  name="password"
                  className="signup_input border"
                  type={`${isShowBtnFstClick ? "text" : "password"}`}
                  placeholder="Entrer votre mot de passe"
                />
                {isShowBtnFstClick ? (
                  <IoEyeOffOutline
                    onClick={handleShowBtnFstClick}
                    className="absolute inline top-2 right-2"
                  />
                ) : (
                  <IoEyeOutline
                    onClick={handleShowBtnFstClick}
                    className="absolute inline top-2 right-2"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirm_mdp" className="font-bold">
              Confirmation du mot de passe
            </label>
            <div>
              <div className="relative">
                <input
                  onChange={handleChangePasswordConfirm}
                  id="confirm_mdp"
                  name="passwordConfirm"
                  className="signup_input border"
                  type={`${isShowBtnSndClick ? "text" : "password"}`}
                  placeholder="Entrer votre mot de passe à nouveau"
                />
                {isShowBtnSndClick ? (
                  <IoEyeOffOutline
                    onClick={handleShowBtnSndClick}
                    className="absolute inline top-2 right-2"
                  />
                ) : (
                  <IoEyeOutline
                    onClick={handleShowBtnSndClick}
                    className="absolute inline top-2 right-2"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="account_type" className="font-bold">
              Type du compte
            </label>
            <select
              onChange={handleInputsChange}
              id="account_type"
              name="role"
              className="signup_input border"
            >
              <option value="student">Étudiant</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>

          <div className="flex justify-between mt-5">
            <input
              className="border p-2 w-20 rounded font-bold"
              type="button"
              value="Annuler"
              onClick={handleAnnulerClick}
            />
            <input
              className="border p-2 w-20 rounded font-bold"
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
