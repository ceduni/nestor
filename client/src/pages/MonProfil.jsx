import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function MonProfil() {
  const [isModifBtnClick, setIsModifBtnClick] = useState(false);
  const [isShowBtnFstClick, setIsShowBtnFstClick] = useState(false);
  const [isShowBtnSndClick, setIsShowBtnSndClick] = useState(false);
  const [passwordComfirm, setPasswordConfirm] = useState("");
  const [userInfo, setUserInfo] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "student",
  });
  const [profilInfo, setProfilInfo] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "student",
  });

  useEffect(() => {
    getCurrrentInfo();
  }, []);

  const getCurrrentInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      let userId = localStorage.getItem("userid");
      userId = userId.replace(/^"(.*)"$/, '$1');

      const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const data = await response.json();
      setUserInfo(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleModifBtnClick = () => {
    setIsModifBtnClick(true);
  };
  const handleInputsChange = () => {};
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
    setIsModifBtnClick(false);
  };
  const isAnyFieldEmpty = ()=>{
    return Object.values(profilInfo).some(value => value.trim() === "");
  }
  const handleSignupClick = (e) => {
    e.preventDefault();
    // console.log(profilInfo);

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

    // post update

  };

  return (
    <section>
      <div className="flex justify-center items-center">
        <div className="signup_container flex flex-col justify-center items-center gap-5 rounded-3xl m-10 px-5 py-10 shadow-md">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-bold">Mon profil</h1>
            <button
              onClick={handleModifBtnClick}
              className="border w-20 rounded p-1"
            >
              Modifier
            </button>
          </div>
          <form className="account_create_form flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="profil_name" className="font-bold">
                Nom
              </label>
              <input
                id="profil_name"
                name="lastName"
                className="signup_input border"
                type="text"
                disabled="true"
                value={userInfo.lastName}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="prenom" className="font-bold">
                Prénom
              </label>
              <input
                id="prenom"
                name="firstName"
                className="signup_input border"
                type="text"
                disabled="true"
                value={userInfo.firstName}
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
                disabled={!isModifBtnClick}
                value={isModifBtnClick ? profilInfo.userName : userInfo.userName}
                placeholder={
                  isModifBtnClick
                    ? "Entrer votre nouveau nom d'utilisateur"
                    : ""
                }
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="courriel" className="font-bold">
                Courriel
              </label>
              {isModifBtnClick && <small>Ex : exemple@gmail.com</small>}
              <input
                onChange={handleInputsChange}
                id="courriel"
                name="email"
                className="signup_input border"
                type="email"
                disabled={!isModifBtnClick}
                value={`${isModifBtnClick ? "" : userInfo.email}`}
                placeholder={`${isModifBtnClick ? "Entrer votre nouveau courriel" : ""}`}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="motdepasse" className="font-bold">
                Mot de passe
              </label>
              {isModifBtnClick && (
                <>
                  <small>
                    Votre mot de passe doit contenir au moins 10 caractères
                  </small>
                  {/* <small>
                    Votre mot de passe doit comprendre au moins :
                    <div className="pl-3">
                      <li>une lettre majuscule (a à z)</li>
                      <li>une lettre minuscule (A à Z)</li>
                      <li>un chiffre (0 à 9)</li>
                      <li>un caractère spécial (!, @, #, $, ...)</li>
                    </div>
                  </small> */}
                  <small>Ex : Motdepasse</small>
                </>
              )}
              <div className="">
                <div className="relative">
                  <input
                    onChange={handleInputsChange}
                    id="motdepasse"
                    name="password"
                    className="signup_input border"
                    type={`${isShowBtnFstClick ? "text" : "password"}`}
                    disabled={!isModifBtnClick}
                    value={`${isModifBtnClick ? profilInfo.password : "**********"}`}
                    placeholder={`${isModifBtnClick ? "Entrer votre nouveau mot de passe" : ""}`}
                  />
                  {isModifBtnClick && (isShowBtnFstClick ? 
                    <IoEyeOffOutline
                      onClick={handleShowBtnFstClick}
                      className="absolute inline top-2 right-2"
                    />
                  :
                    <IoEyeOutline
                      onClick={handleShowBtnFstClick}
                      className="absolute inline top-2 right-2"
                    />)
                  }
                </div>
              </div>
            </div>

            {isModifBtnClick && (
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
            )}

            {/* <div className="flex flex-col">
              <label htmlFor="account_type" className="font-bold">
                Type du compte
              </label>
              <select
                onChange={handleInputsChange}
                id="account_type"
                name="role"
                className={`signup_input border bg-gray-100 appearance-none`}
                disabled="true"
              >
                <option value="Étudiant">Étudiant</option>
                <option value="Administrateur">Administrateur</option>
              </select>
            </div> */}

            <div className="flex justify-between mt-5">
              <input
                className="border p-2 w-24 rounded font-bold"
                type="button"
                value="Annuler"
                onClick={handleAnnulerClick}
              />
              <input
                className="border p-2 w-24 rounded font-bold"
                type="button"
                value="Confirmer"
                onClick={handleSignupClick}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
