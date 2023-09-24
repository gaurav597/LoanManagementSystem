import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import CustomerService from '../../services/CDS'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminDashboard from './AdminDashboard';
import AddCustomer from './AddCustomer';

import AppContext from '../../Context';
import moment from "moment"

function CDE() {
    const history = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [message, setMessage] = useState('');
    const [id, setId] = useState("_none")
    const [empId, setEmpId] = useState("");
    const [dsg, setDsg] = useState("Manager");
    const [name, setName] = useState("");
    const [dob, setDob] = useState(new Date());
    const [dept, setDept] = useState("Finance");
    const [doj, setDoj] = useState(new Date());
    const [gdr, setGdr] = useState("M");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [changed, setChanged] = useState(false);

    useEffect(()=>{
        fetchCustomerData();
        setShow(false);
        setChanged(false);
    }, [changed]);

    useEffect(()=>{
        console.log(id);
        if(id==="_none")
        {
            setShow(false);
            setEmpId("")
            setName("");
            setDsg("Manager");
            setDept("Finance");
            setGdr("M");
            setDob(new Date());
            setDoj(new Date());
            setPassword("");
            console.log('loli');
        }
        else if(id!=='_add')
        {
            const Response = CustomerService.getCustomerById(id).then((Response)=>{
                setEmpId(Response.data.employeeId)
                setName(Response.data.employeeName);
                setDsg(Response.data.designation);
                setDept(Response.data.department);
                setGdr(Response.data.gender);
                setDob(Response.data.dateOfBirth);
                setDoj(Response.data.dateOfJoin);
                setPassword(Response.data.password);
                setShow(true)
                console.log('lol', Response);
            });
        }
        else
        {
            setEmpId("")
            setName("");
            setDsg("Manager");
            setDept("Finance");
            setGdr("M");
            setDob(new Date());
            setDoj(new Date());
            setPassword("");
            setShow(true)
            console.log('lolli');
        }
    }, [id]);

    const fetchCustomerData = () => {
        CustomerService.getCustomers().then((Response) => {
            console.log(Response.data);
            setCustomers(Response.data);
        })
    }

    const addCustomer = () => {
        setId("_add");
        setShow(true);
        console.log('hihihi');
        // history('/addCustomer/_add'); //Navigates to CreateCustomer component and passes '_add' as parameter.
    }

    const editCustomer = (eid) => {
        setId(eid);
        console.log('hihi');
        // history(`/addCustomer/${id}`); //Navigates to CreateCustomer component and passes 'id' as parameter.
    }

    const deleteCustomer = (eid) => {
        CustomerService.deleteCustomer(eid).then(()=>{
            fetchCustomerData();
            setMessage('Customer deleted successfully.');
            //Clear the message after 2 seconds.
            setTimeout(() => {
                setMessage('');
            }, 2000);
        });
    }

    const editButton = (data) =>
    {
        return(
            <button className='btn btn-success' data-toggle='modal' data-target=".bd-example-modal-lg" onClick={()=>editCustomer(data.employeeId)}>
                <span>
                    <FontAwesomeIcon icon="edit" />
                </span>
            </button>
        )
    }

    const deleteButton = (data) =>
    {
        return(
            <button className='btn btn-danger' onClick={()=>deleteCustomer(data.employeeId)}>
                <span>
                    <FontAwesomeIcon icon="trash" />
                </span>
            </button>
        )
    }

    const saveOrUpdateCustomer = (event) => {
        event.preventDefault();
        const customer = {"employeeId": empId, "employeeName": name, "password": password, "gender": gdr, "dateOfBirth": dob, "dateOfJoin": doj, "designation": dsg, "department": dept};

        if(id==='_add')
        {
            CustomerService.addCustomer(customer).then((Response)=>{
                console.log(Response)
            })
            setId("_none");
            setShow(false);
            setChanged(true);
            // history('/CDE');
        }
        else if (id!=="_none")
        {
            console.log("lol", customer);
            CustomerService.updateCustomer(customer, id).then(()=>{
                // history('/CDE');
            });
            setId("_none");
            setShow(false);
            setChanged(true);
        }
    };

    const getTitle = () => {
        if (id==='_add') {
            return <h1 className="modal-title">Add Customer</h1>;
        } else {
            return <h1 className="modal-title">Update Customer</h1>;
        }
    };

    const cancel = () => {
        // history('/CDE');
        setId("_none");
        setShow(false);
    };

    return (
        <React.Fragment>
            <div>
                <AppContext.Provider value={{id, empId, setEmpId, dsg, setDsg, name, setName, dob, setDob, dept, setDept, doj, setDoj, gdr, setGdr, password, setPassword}}>
                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                {getTitle()}
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                {show?<div className='container'>
                                    <AddCustomer />
                                </div>:<></>}
                            </div>
                            <div class="modal-footer">
                                <button className="btn btn-success" data-dismiss='modal' onClick={saveOrUpdateCustomer}>Submit</button>
                                <button className="btn btn-danger" data-dismiss='modal' onClick={cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                {console.log("lol")}
                </AppContext.Provider>
                <br/>
                {/* <AdminDashboard /> */}
                <div className="text-center text-white mb-4">
                    <h1>Customer Master Data Details</h1>
                </div>

                <div className="d-flex justify-content-center">
                    <div className="table-responsive" style={{width: "80%"}}> {/* Adjust width as needed */}
                        <table className="table table-bordered table-striped table-hover w-100">
                            <thead className="table-danger">
                                <tr>
                                    <th style={{width: "12.5%"}}>Employee Id</th> {/* Adjust column widths as needed */}
                                    <th style={{width: "15%"}}>Employee Name</th>
                                    <th style={{width: "10%"}}>Designation</th>
                                    <th style={{width: "15%"}}>Department</th>
                                    <th style={{width: "5%"}}>Gender</th>
                                    <th style={{width: "15%"}}>Date of Birth</th>
                                    <th style={{width: "15%"}}>Date of Joining</th>
                                    <th style={{width: "12.5%"}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* ... Your existing mapping code ... */}
                                {customers && customers.map(cust => 
                                    <tr key={cust.id}>
                                        <td>{cust.employeeId}</td>
                                        <td>{cust.employeeName}</td>
                                        <td>{cust.designation}</td>
                                        <td>{cust.department}</td>
                                        <td>{cust.gender}</td>
                                        <td>{cust.dateOfBirth}</td>
                                        <td>{cust.dateOfJoin}</td>
                                        <td>
                                            <button className='btn btn-success mr-2' data-toggle='modal' data-target=".bd-example-modal-lg" onClick={()=>editCustomer(cust.employeeId)}>
                                                <FontAwesomeIcon icon="edit" />
                                            </button>
                                            <button className='btn btn-danger' onClick={()=>deleteCustomer(cust.employeeId)}>
                                                <FontAwesomeIcon icon="trash" />
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-3">
                    <button className='btn btn-info w-auto' data-toggle='modal' data-target=".bd-example-modal-lg" onClick={addCustomer}>Add Customer</button>
                </div>

                {message && <div className='alert alert-success mt-3 text-center'>{message}</div>}
            </div>
        </React.Fragment>
    )
}

export default CDE;