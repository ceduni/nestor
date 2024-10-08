import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";
import { useLoginStatus } from "../context/LoginStatusContext";

const defaultItems = [];
const adminItems = ["Mes réservations", "Gérer mes espaces", "Mon profil"];
const studentItems = ["Mes réservations", "Mon profil"];

export default function Header() {
  const { hasLogedin, setHasLogedin, isAdmin, setIsAdmin } = useLoginStatus();
  const [navItems, setNavitems] = useState(() =>
    selectNavItems(hasLogedin, isAdmin),
  );

  useEffect(() => {
    setNavitems(selectNavItems(hasLogedin, isAdmin));
  }
  , [hasLogedin, isAdmin]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    localStorage.removeItem("logedin");
    setHasLogedin(false);
  };

  return (
    <header className="header sticky top-0 z-10 bg-white px-32 h-max w-full flex place-content-between items-center">
      {/* Nestor logo */}
      <Link to="/">
        <img
          className="size-16"
          src="../src/assets/logo-nestor.svg"
          alt="logo"
        />
      </Link>

      <nav>
        <ul className="flex justify-center gap-8">
          {/* nav items */}
          {navItems.map((item) => (
            <Link
              key={uuidv4()}
              className="nav_items"
              to={item.toLowerCase().replace(/\s+/g, "")}
            >
              {/* {console.log(item)} */}
              <li>{item}</li>
            </Link>
          ))}

          {/* nav connection button */}
          <Link
            to={`${hasLogedin ? "" : "connexion/login"}`}
            className="nav_items"
          >
            {hasLogedin ? 
              <li>
                <RiLogoutBoxLine onClick={handleLogout} className="size-6" />
              </li>
              :
              <li>
                <RiLoginBoxLine className="size-6" />
              </li>
            }
          </Link>
        </ul>
      </nav>
    </header>
  );
}

function selectNavItems(logedIn, isAdmin) {
  if (logedIn == true) {
    if (isAdmin == true) {
      return adminItems;
    } else {
      return studentItems;
    }
  } else {
    return defaultItems;
  }
}
