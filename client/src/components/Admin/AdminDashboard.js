import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/AdminDashboard.css"
import Header from '../Header';
import CustomerDataManagement from './CustomerDataManagement';
function AdminDashboard() {
    const history = useNavigate();

    const routeToCustomerData = () => {
        history('/customerDataManagement')

    }

    const routeToLoanCard = () => {
        history('/loanCardManagement')
    }

    const routeToItems = () => {
        history('/itemsMasterData')
    }


    return (
        <div>
            <Header />
        </div>

    )
}

export default AdminDashboard
