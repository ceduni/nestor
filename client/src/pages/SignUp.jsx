import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordComfirm, setPasswordConfirm] = useState("");
  const [telephone, setTelephone] = useState("");
  const [typeCompte, setTypeCompte] = useState("Étudiant");
  const [loginError, setLoginError] = useState("");

  const handleChangeNom = (e) => {
    setNom(e.target.value);
  };
  const handleChangePrenom = (e) => {
    setPrenom(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const handleChangeTelephone = (e) => {
    setTelephone(e.target.value);
  };
  const handleChangeTypeCompte = (e) => {
    setTypeCompte(e.target.value);
  };

  const handleAnnulerClick = (e) => {
    e.preventDefault();
    navigate("../connexion/login");
  };
  const handleSignupClick = (e) => {
    e.preventDefault();
    // add post
  };
  return (
    <div className="flex justify-center items-center">
      <div className="account_create_container flex flex-col justify-center items-center gap-5 border m-10 px-5 py-10">
        <h1>Créer un compte </h1>
        <form className="account_create_form flex flex-col gap-3">
          <label htmlFor="nom">Nom</label>
          <input
            onChange={handleChangeNom}
            id="nom"
            className="account_create_input border"
            type="text"
            placeholder="Enter votre nom"
          />

          <label htmlFor="prenom">Prénom</label>
          <input
            onChange={handleChangePrenom}
            id="prenom"
            className="account_create_input border"
            type="text"
            placeholder="Entrer votre prénom"
          />

          <label htmlFor="courriel">Courriel</label>
          <input
            onChange={handleChangeEmail}
            id="courriel"
            className="account_create_input border"
            type="email"
            placeholder="Enter votre courriel"
          />

          <label htmlFor="motdepasse">Mot de passe</label>
          <input
            onChange={handleChangePassword}
            id="motdepasse"
            className="account_create_input border"
            type="password"
            placeholder="Entrer votre mot de passe"
          />
          <label htmlFor="confirm_mdp">Confirmation du mot de passe</label>
          <input
            onChange={handleChangePasswordConfirm}
            id="confirm_mdp"
            className="account_create_input border"
            type="password"
            placeholder="Entrer votre mot de passe à nouveau"
          />

          <label htmlFor="tel">Téléphone</label>
          <input
            onChange={handleChangeTelephone}
            id="tel"
            className="account_create_input border"
            type="tel"
            placeholder="Entrer votre numéro de téléphone"
          />

          <label htmlFor="account_type">Type du compte</label>
          <select
            onChange={handleChangeTypeCompte}
            id="account_type"
            className="account_create_input border"
          >
            <option value="Étudiant">Étudiant</option>
            <option value="Administrateur">Administrateur</option>
          </select>

          <div className="flex justify-between mt-5">
            <input
              className="border p-2"
              type="button"
              value="Annuler"
              onClick={handleAnnulerClick}
            />
            <input
              className="border p-2"
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
