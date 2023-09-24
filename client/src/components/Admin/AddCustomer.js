import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import CustomerService from "../../services/CDS";
import { useNavigate, useParams} from 'react-router-dom';
import moment from "moment"
import Button from 'react-bootstrap/Button';
import CustomerDataManagement from './CustomerDataManagement';

export default function AddCustomer()
{
    const navigate = useNavigate();
    const {id} = useParams();

    const [empId, setEmpId] = useState("");
    const [dsg, setDsg] = useState("Manager");
    const [name, setName] = useState("");
    const [dob, setDob] = useState(new Date());
    const [dept, setDept] = useState("Finance");
    const [doj, setDoj] = useState(new Date());
    const [gdr, setGdr] = useState("M");
    const [password, setPassword] = useState("");
    const [edit, setEdit] = useState(false)

    useEffect(()=>{
        if(id!=='_add')
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
                console.log('lol', Response);
            });
        }
    }, [id]);

    const saveOrUpdateCustomer = (event) => {
        event.preventDefault();
        const customer = {"employeeId": empId, "employeeName": name, "password": password, "gender": gdr, "dateOfBirth": dob, "dateOfJoin": doj, "designation": dsg, "department": dept};

        if(id==='_add')
        {
            CustomerService.addCustomer(customer).then((Response)=>{
                console.log(Response)
            })
            navigate('/CDE');
        }
        else
        {
            console.log("lol", customer);
            CustomerService.updateCustomer(customer, id).then(()=>{
                navigate('/CDE');
            });
        }
    };

  // methods to set value of state
    const changeIdHandler = (event) => {
        setEmpId(event.target.value);
    }
    const changeNameHandler = (event) => {
        setName(event.target.value);
    };

    const changeDsgHandler = (event) => {
        setDsg(event.target.value);
    };

    const changeDeptHandler = (event) => {
        setDept(event.target.value); 
    };

    const changeGdrHandler = (event) => {
        setGdr(event.target.value);
    };

    const changeDobHandler = (event) => {
        setDob(event.target.value);
    };

    const changeDojHandler = (event) => {
        setDoj(event.target.value);
    };

    const changePasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    const cancel = () => {
        navigate('/CDE');
    };

    const getTitle = () => {
        if (id==='_add') {
            return <h1 className="modal-title" style={{color: "white"}}>Add Customer</h1>;
        } else {
            return <h1 className="modal-title" style={{color: "white"}}>Update Customer</h1>;
        }
    };

    return (
        <React.Fragment>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Add Customer</button>
            
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
                            <div className='container'>
                                <Container fluid="md">
                                    <Form>

                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Employee Id</Form.Label>
                                                    <Form.Control type="text" value={empId} onChange={changeIdHandler} />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Label>Designation</Form.Label>
                                                <Form.Select aria-label="Default select example" value={dsg} onChange={changeDsgHandler}>
                                                    <option value="Manager">Manager</option>
                                                    <option value="SDE1">SDE1</option>
                                                    <option value="SDE2">SDE2</option>
                                                    <option value="SDE3">SDE3</option>
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Employee Name</Form.Label>
                                                    <Form.Control type="text" value={name} onChange={changeNameHandler} />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Date of Birth</Form.Label>
                                                    <Form.Control type="date" value={moment(dob).format('YYYY-MM-DD')} onChange={changeDobHandler} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Department</Form.Label>
                                                    <Form.Select aria-label="Default select example" value={dept} onChange={changeDeptHandler}>
                                                        <option value="Finance">Finance</option>
                                                        <option value="HR">HR</option>
                                                        <option value="Sales">Sales</option>

                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Date of Joining</Form.Label>
                                                    <Form.Control type="date" value={moment(doj).format('YYYY-MM-DD')} onChange={changeDojHandler} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Gender</Form.Label>
                                                    <Form.Select aria-label="Default select example" value={gdr} onChange={changeGdrHandler}>
                                                        <option value="M">Male</option>
                                                        <option value="F">Female</option>
                                                        <option value="O">Other</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control type="text" value={password} onChange={changePasswordHandler} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Container>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button className="btn btn-success" onClick={saveOrUpdateCustomer}>Submit</button>
                            <button className="btn btn-danger" onClick={cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
