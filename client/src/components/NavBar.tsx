import { CiBookmark } from "react-icons/ci";
import { FaUser } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
export default function NavBar() {
    return (
        <header className="nav-container">
            <div className="app-logo">
                <img src="src/assets/logo.png"/>
            </div>
            <div className="nav-left-container">
                <div className="nav-icon-container">
                    <IoIosNotificationsOutline className="nav-icon-item"/>
                    <CiBookmark className="nav-icon-item"/>
                    <div className="nav-icon-item">
                        <div className="user-profile-icon-container">
                            <FaUser className="user-profile-icon"/>
                        </div>
                    </div>
                </div>
                <div className="nav-tag-container">
                    <div className="nav-tag-item">
                        <div>Réservations</div>
                    </div>
                    <div className="nav-tag-item">
                        <div>Accueil</div>
                    </div>
                </div>
            </div>
        </header>
    )
}