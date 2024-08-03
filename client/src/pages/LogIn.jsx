import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../apis/user-api";

export default function LogIn() {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  const handleInputsChange = (e) => {
    const { name, value } = e.target;

    setLoginInfo((prev) =>
      prev
        ? {
            ...prev,
            [name]: value,
          }
        : prev,
    );
  };
  const handleSignupClick = () => {
    navigate("../connexion/signup");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(loginInfo);

    //
    // try {
    //   const res = await loginUser(email, password);
    //   localStorage.setItem("token", response.token);
    //   navigate("/");
    // } catch (err) {
    //   setLoginError(
    //     `La connexion a échoué. Veuillez vérifier vos informations d'identification et réessayer.`,
    //   );
    //   console.error(err);
    // }
  };

  return (
    <div className="login_section flex justify-center items-center">
      <div className="login_container flex flex-col justify-center items-center gap-5 m-20 p-10 shadow-md rounded-3xl">
        <h1 className="text-2xl font-bold">Connexion</h1>
        {loginError && <p className="error">{loginError}</p>}
        <form
          className="login_form flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="font-bold">
              Courriel
            </label>
            <input
              id="email"
              name="email"
              onChange={handleInputsChange}
              className="login_input w-56 p-1 border"
              type="email"
              placeholder="Enter votre courriel"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className="font-bold">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              onChange={handleInputsChange}
              className="login_input w-56 p-1 border font-bold"
              type="password"
              placeholder="Entrer votre mot de passe"
            />
          </div>

          <div className="flex flex-col items-center gap-3">
            <input
              className="border font-bold w-40 h-8 rounded-md"
              type="submit"
              value="Se connecter"
            />
            <p className="text-center">Ou</p>
            <input
              type="button"
              value="Créer un compte"
              onClick={handleSignupClick}
              className="border font-bold w-40 h-8 rounded-md"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
