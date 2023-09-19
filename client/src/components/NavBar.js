import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = () => {
    return (
        <nav className="navbar">
            <div class="row px-3 justify-content-center font">
                <h2><Link to="/" style={{ textDecoration: 'none' }} className="link"> Loan Management System </Link></h2>
            </div>
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/CDE" className="nav-link">
                        <span>
                            <FontAwesomeIcon icon="people-group" />
                        </span>&nbsp;
                        Customer Data
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