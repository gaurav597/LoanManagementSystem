import React from 'react'
import "../styles/Navbar.css"
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <div>
            <nav className="navbar">
                <div class="row px-3 justify-content-center font">
                    <h2><Link to="/adminDashboard" style={{ textDecoration: 'none' }} className="link"> Loan Management System </Link></h2>
                </div>
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            Sign Out
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">
                            Contact Us
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header