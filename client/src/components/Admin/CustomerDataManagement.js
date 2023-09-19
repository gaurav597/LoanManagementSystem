import React, { useEffect } from 'react'
import { useState } from 'react';
import CustomerService from '../../services/CustomerService';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
function CustomerDataManagement() {
  const history = useNavigate();
  const addCustomer = () => {
    history('/addCustomer')
  };
  const [employeeData, setEmployeeData] = useState([]);
  useEffect(() => {
    ;
    CustomerService.getCustomer().then((res) => {
      console.log(res.data);
      setEmployeeData(res.data);
      console.log(employeeData)
    })
  }, []);

  function handleDelete(empId) {
    console.log(empId);
    CustomerService.deleteCustomer(empId).then((res) => {
      console.log(res);
    })

    

  }
  return (
    <div>
     <AdminDashboard/>
      <button onClick={addCustomer}> Add Customer </button>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Employee Id</th>
            <th scope="col">Employee Name</th>
            <th scope="col">Designation</th>
            <th scope="col">Department</th>
            <th scope="col">gender</th>
            <th scope="col">Date_of_Birth</th>
            <th scope="col">Date_of_Joining</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((item) => (
            <tr>
              <th scope="row">{item.employeeId}</th>
              <td>{item.employeeName}</td>
              <td>{item.designation}</td>
              <td>{item.department}</td>
              <td>{item.gender}</td>
              <td>{item.dateOfBirth}</td>
              <td>{item.dateOfJoining}</td>
              <td>Edit</td>
              <td onClick={(e) => handleDelete(item.employeeId)}>Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CustomerDataManagement
