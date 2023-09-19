import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/Navbar.css"
import Header from '../Header';

function AdminDashboard() {
    return (
        <div>
            <Header />
            <nav
                className="navbar justify-content-center"
                style={{ background: "#780078" }}
            >
                <ul className='nav-list'>
                    <li className="nav-item">
                        <Link to="/CDE" className="nav-link">
                            Customer Data Management
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/LDE" className="nav-link">
                            Loan Card Management
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/IDE" className="nav-link">
                            Items Master Data
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>

    )
}

export default AdminDashboard
