import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import "../../styles/Navbar.css"
const EmployeeDashboard = () => {
  ;
  const history = useNavigate()

  return (
    <div>
      <Header />
      <nav
        className="navbar justify-content-center"
        style={{ background: "#780078" }}
      >
        <ul className='nav-list'>
          <li className="nav-item">
            <Link to="/viewLoans" className="nav-link">
              View Loans
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/applyLoan" className="nav-link">
              Apply Loans
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/itemPurchased" className="nav-link">
              View Items Purchased
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default EmployeeDashboard