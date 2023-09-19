import {React, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import CustomerService from '../../services/CDS'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CDE() {
    const history = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(()=>{
        fetchCustomerData();
    }, []);

    const fetchCustomerData = () => {
        // CustomerService.getCustomers().then((Response) => {
        //     console.log(Response.data);
        //     setCustomers(Response.data);
        // })
        setCustomers(CustomerService.getCustomers().data)
    }

    const addCustomer = () => {
        history('/addCustomer/_add'); //Navigates to CreateCustomer component and passes '_add' as parameter.
    }

    const editCustomer = (id) => {
        history(`/addCustomer/${id}`); //Navigates to CreateCustomer component and passes 'id' as parameter.
    }

    const deleteCustomer = (id) => {
        CustomerService.deleteCustomer(id);
            fetchCustomerData();
            setMessage('Customer deleted successfully.');
            //Clear the message after 2 seconds.
            setTimeout(() => {
                setMessage('');
            }, 2000);
    }

    const editButton = (data) =>
    {
        return(
            <button className='btn btn-success' onClick={()=>editCustomer(data.eid)}>
                <span>
                    <FontAwesomeIcon icon="edit" />
                </span>
            </button>
        )
    }

    const deleteButton = (data) =>
    {
        return(
            <button className='btn btn-danger' onClick={()=>deleteCustomer(data.eid)}>
                <span>
                    <FontAwesomeIcon icon="trash" />
                </span>
            </button>
        )
    }

    return (
        <div>
            <br/>
        
            <h1 className="text-heading">Customer Master Data Details</h1>
            <div className="row justify-content-center" >
                <table className="table table-success w-auto">
                <thead>
                    <tr className="table-danger">
                        <th> Employee Id</th>
                        <th> Employee Name</th>
                        <th> Designation</th>
                        <th> Department</th>
                        <th> gender</th>
                        <th> Date_of_Birth</th>
                        <th> Date_of_Joining</th>
                        <th> Actions</th>
                    </tr>
                </thead>
                <tbody>
                        {console.log(customers)}
                        {customers&&customers.map(
                                cust => 
                                <tr key={cust.id}>
                                    <td> {cust.eid} </td>
                                    <td> {cust.name} </td>
                                    <td> {cust.dsg} </td>
                                    <td> {cust.dept} </td>
                                    <td> {cust.gdr} </td>
                                    <td> {cust.dob} </td>
                                    <td> {cust.doj} </td>
                                    <td>
                                        {editButton(cust)}
                                        &nbsp;
                                        {deleteButton(cust)}
                                    </td>
                                
                                </tr>
                            )
                        }
                </tbody>
                </table>
            </div>
            <br/>
                <div className = "row justify-content-center">
                    <button className='btn btn-info w-auto' onClick={addCustomer}>Add Customer</button>
                </div>
            <br/>
            {message && <div className='alert alert-success'>{message}</div>}
        </div>
    )
}

export default CDE;