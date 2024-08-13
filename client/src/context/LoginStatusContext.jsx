import { createContext, useState, useEffect, useContext } from "react";

const LoginStatusContext = createContext();

export function LoginStatusProvider({ children }) {
  const [hasLogedin, setHasLogedin] = useState(localStorage.getItem("logedin") ? true : false);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") ? true : false);
  const [userInfo, setUserInfo] = useState({  
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "student",
  });

  return (
    <LoginStatusContext.Provider
      value={{ hasLogedin, setHasLogedin, isAdmin, setIsAdmin }}
    >
      {children}
    </LoginStatusContext.Provider>
  );
}

export const useLoginStatus = () => {
  const context = useContext(LoginStatusContext);

  if (!context) {
    throw new Error("useLoginStatus must be used within a LoginStatusProvider");
  }

  return context;
};
