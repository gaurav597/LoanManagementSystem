import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
    const auth = useAuth();
    const history = useNavigate();
    const handleLogout = () => {
        auth.logout();
        history('/')
    }
    return (
        <nav className="navbar">
            <div class="row px-3 justify-content-center font">
                <h2><Link to="/" style={{ textDecoration: 'none' }} className="link"> Loan Management System </Link></h2>
            </div>
            {
                !auth.user && (
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">
                                <span> <FontAwesomeIcon icon={"camera-retro"}> </FontAwesomeIcon></span>&nbsp;
                                Register
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">
                                <span> <FontAwesomeIcon icon="sign-hanging"> </FontAwesomeIcon></span>&nbsp;
                                Login
                            </Link>
                        </li>

                    </ul>
                )
            }
            {
                auth.user &&
                <ul className="nav-list">
                    <li className="nav-item">
                        <button onClick={handleLogout} style={{ backgroundColor: "transparent", border: "none", color: "white" }}>
                            <span> <FontAwesomeIcon icon="sign-hanging"> </FontAwesomeIcon></span>&nbsp;
                            <b> Logout </b>  </button>
                    </li>
                </ul>
            }
        </nav>
    )
}

export default NavBar;