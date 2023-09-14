import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        <span> <FontAwesomeIcon iicon={"camera-retro"}> </FontAwesomeIcon></span>&nbsp;
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        <span> <FontAwesomeIcon icon={"camera-retro"}> </FontAwesomeIcon></span>&nbsp;
                        Register
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        <span> <FontAwesomeIcon icon={"camera-retro"}> </FontAwesomeIcon></span>&nbsp;
                        Login
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;