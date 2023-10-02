import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CustomerService from '../services/CDS'

const NavBar = () => {
    const auth = useAuth();
    const history = useNavigate();

    const handleLogout = () => {
        auth.logout();
        history('/')
    }

    const [dsg, setDsg] = useState("");
    const [name, setName] = useState("");
    const [dept, setDept] = useState("");

    useEffect(() => {
        if(auth.user)
        {
            const Response = CustomerService.getCustomerById(auth.user).then((Response) => {
                setName(Response.data.employeeName);
                setDsg(Response.data.designation);
                setDept(Response.data.department);
                console.log('lol', Response);
            });
        }
    }, [auth]);
    return (
        <nav className="navbar" style={{ fontFamily: "Libre Baskerville" }}>
            <div class="row px-3 justify-content-center">
                <h2><Link to="/" style={{ textDecoration: 'none' }} className="link"> <b>Pro Loan-o</b></Link></h2>
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
                                <span> <FontAwesomeIcon icon="sign-in"> </FontAwesomeIcon></span>&nbsp;
                                Login
                            </Link>
                        </li>

                    </ul>
                )
            }
            {
                auth.user &&
                <ul className="nav-list">
                    <li className="nav-item nav-link">
                        <button
                            style={{ backgroundColor: "transparent", border: "none", color: "white" }}
                            data-title={`Name:\n${name}\n\nDesignation:\n${dsg}\n\nDepartment:\n${dept}`}
                            className="custom-tooltip"
                        >
                            <span>
                                <FontAwesomeIcon icon="person-half-dress"></FontAwesomeIcon>&nbsp;
                                <b> User ID: {auth.user} </b>
                            </span>
                        </button>
                    </li>
                    <li className="nav-item nav-link">
                        <button onClick={handleLogout} style={{ backgroundColor: "transparent", border: "none", color: "white" }}>
                            <span> <FontAwesomeIcon icon="sign-out"> </FontAwesomeIcon></span>&nbsp;
                            <b> Logout </b>  </button>
                    </li>
                </ul>
            }
        </nav>
    )
}

export default NavBar;