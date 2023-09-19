import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CustomerService from "../../services/CDS";
import AdminDashboard from './AdminDashboard';
import { useNavigate, useParams} from 'react-router-dom';
import moment from "moment"

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

    useEffect(()=>{
        if(id!=='_add')
        {
            const Response = CustomerService.getCustomerById(id).then((Response)=>{
                setName(Response.name);
                setDsg(Response.dsg);
                setDept(Response.dept);
                setGdr(Response.gdr);
                setDob(Response.dob);
                setDoj(Response.doj);
                setPassword(Response.password);
            });
        }
    }, [id]);

    const saveOrUpdateCustomer = (event) => {
        event.preventDefault();
        const customer = {empId, name, password, dsg, dept, gdr, dob, doj};

        if(id==='_add')
        {
            CustomerService.addCustomer(customer).then((Response)=>{
                console.log(Response)
            })
            navigate('/CDE');
        }
        else
        {
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
            return <h1 className="text-center" style={{color: "white"}}>Add Customer</h1>;
        } else {
            return <h1 className="text-center" style={{color: "white"}}>Update Customer</h1>;
        }
    };

    return (
        <div className='container'>
            {getTitle()}
            <Container fluid="md">
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Employee Id</Form.Label>
                                <Form.Control type="text" value={empId} onChange={changeIdHandler} />
                            </Form.Group>
                            {/* <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="3">
                                    Employee Id
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" />
                                </Col>
                            </Form.Group> */}
                        </Col>
                        <Col>
                            {/* <Form.Group as={Row}>
                        <Form.Label column sm="3">Designation</Form.Label>
                        <Col sm="9">

                        <Form.Select aria-label="Default select example">
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>                        </Col>
                           
                        </Form.Group> */}
                            <Form.Label>Designation</Form.Label>
                            <Form.Select aria-label="Default select example" defaultValue={dsg} onChange={changeDsgHandler}>
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
                                <Form.Select aria-label="Default select example" defaultValue={dept} onChange={changeDeptHandler}>
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
                                <Form.Select aria-label="Default select example" defaultValue={gdr} onChange={changeGdrHandler}>
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
                <button className="btn btn-success" onClick={saveOrUpdateCustomer}>Submit</button>
                <button className="btn btn-danger" onClick={cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
            </Container>
        </div>
    )
}
