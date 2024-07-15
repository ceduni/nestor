import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../apis/user-api";

export default function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignupClick = () => {
    navigate("../connexion/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, username);
      localStorage.setItem("token", response.token);
      navigate("/");
    } catch (err) {
      setLoginError(
        `La connexion a échoué. Veuillez vérifier vos informations d'identification et réessayer.`,
      );
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="login_container flex flex-col justify-center items-center gap-5 border m-10 p-10">
        <h1>Connexion</h1>
        {loginError && <p className="error">{loginError}</p>}
        <form
          className="login_form flex flex-col gap-3"
          onSubmit={handleSubmit}
        >
          <label htmlFor="">Courriel</label>
          <input
            onChange={handleEmailChange}
            className="login_input w-56 p-1 border"
            type="email"
            placeholder="Enter votre courriel"
          />

          <label htmlFor="">Mot de passe</label>
          <input
            onChange={handlePasswordChange}
            className="login_input w-56 p-1 border"
            type="password"
            placeholder="Entrer votre mot de passe"
          />

          <input className="border" type="submit" value="Se connecter" />
          <p className="text-center">Ou</p>
          <input
            type="button"
            value="Créer un compte"
            onClick={handleSignupClick}
            className="border"
          />
        </form>
      </div>
    </div>
  );
}
