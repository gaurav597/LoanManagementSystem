import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CustomerService from "../../services/CustomerService";
import AdminDashboard from './AdminDashboard';

export default function AddCustomer() {
    const [empId, setEmpId] = useState("");
    const [desig, setDesig] = useState("Manager");
    const [name, setName] = useState("");
    const [dob, setDob] = useState(new Date());
    const [department, setDepartment] = useState("Finance");
    const [doj, setDoj] = useState(new Date());
    const [gender, setGender] = useState("M");
    const [password, setPassword] = useState("");


    function handleSubmit(e) {
        e.preventDefault();
        const customer = {
            "employeeId": empId,
            "employeeName": name,
            "password": password,
            "gender": gender,
            "dateOfBirth": dob,
            "dateOfJoin": doj,
            "department": department,
            "designation": desig
        }
        const hi = CustomerService.addCustomer(customer).then((response) => { console.log(response) });

        console.log(empId);
        console.log(desig);
        console.log(name);
        console.log(dob);
        console.log(department);
        console.log(doj);
        console.log(gender);
        console.log(password);
    }

    return (
        <div className='container'>
            <AdminDashboard />
            <h1>Add Customer Data</h1>
            <Container fluid="md">
                <Form>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Employee Id</Form.Label>
                                <Form.Control type="text" value={empId} onChange={(e) => setEmpId(e.target.value)} />
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
                            <Form.Select aria-label="Default select example" onChange={(e) => setDesig(e.target.value)}>
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
                                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Department</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={(e) => setDepartment(e.target.value)}>
                                    <option value="Finance">Finance</option>
                                    <option value="HR">HR</option>
                                    <option value="Sales">Sales</option>

                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Date of Joining</Form.Label>
                                <Form.Control type="date" value={doj} onChange={(e) => setDoj(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={(e) => { setGender(e.target.value) }}>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                    <option value="O">Other</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="text" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            </Form.Group>

                        </Col>
                    </Row>

                </Form>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Container>
        </div>
    )
}
