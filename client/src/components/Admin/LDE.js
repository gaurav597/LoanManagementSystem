import {React, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import LoanService from '../../services/LDS'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminDashboard from './AdminDashboard';

function LDE() {
    const history = useNavigate();

    const [loans, setLoans] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(()=>{
        fetchLoanData();
    }, []);

    const fetchLoanData = () => {
        LoanService.getLoans().then((Response) => {
            console.log(Response.data);
            setLoans(Response.data);
        });
    }

    const addLoan = () => {
        history('/addLoan/_add'); //Navigates to CreateCustomer component and passes '_add' as parameter.
    }

    const editLoan = (id) => {
        history(`/addLoan/${id}`); //Navigates to CreateCustomer component and passes 'id' as parameter.
    }

    const deleteLoan = (id) => {
        LoanService.deleteLoan(id);
            fetchLoanData();
            setMessage('Loan deleted successfully.');
            //Clear the message after 2 seconds.
            setTimeout(() => {
                setMessage('');
            }, 2000);
    }

    const editButton = (data) =>
    {
        return(
            <button className='btn btn-success' onClick={()=>editLoan(data.loanId)}>
                <span>
                    <FontAwesomeIcon icon="edit" />
                </span>
            </button>
        )
    }

    const deleteButton = (data) =>
    {
        return(
            <button className='btn btn-danger' onClick={()=>deleteLoan(data.loanId)}>
                <span>
                    <FontAwesomeIcon icon="trash" />
                </span>
            </button>
        )
    }

    return (
        <div>
            <br/>
            <AdminDashboard />
            <h1 className="text-heading" style={{color: "white"}}>Loan Master Data Details</h1>
            <div className="row justify-content-center" >
                <table className="table table-success w-auto">
                <thead>
                    <tr className="table-danger">
                        <th> Loan Id</th>
                        <th> Loan Type</th>
                        <th> Duration</th>
                        <th> Actions</th>
                    </tr>
                </thead>
                <tbody>
                        {console.log(loans)}
                        {loans&&loans.map(
                                loan => 
                                <tr key={loan.id}>
                                    <td> {loan.loanId} </td>
                                    <td> {loan.loanType} </td>
                                    <td> {loan.durationInYears} </td>
                                    <td>
                                        {editButton(loan)}
                                        &nbsp;
                                        {deleteButton(loan)}
                                    </td>
                                
                                </tr>
                            )
                        }
                </tbody>
                </table>
            </div>
            <br/>
                <div className = "row justify-content-center">
                    <button className='btn btn-info w-auto' onClick={addLoan}>Add Loan</button>
                </div>
            <br/>
            {message && <div className='alert alert-success'>{message}</div>}
        </div>
    )
}

export default LDE;