import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CustomerService from "../../services/CustomerService";
import CustomerDataManagement from './CustomerDataManagement';

export default function AddCustomer() {
    const [empId, setEmpId] = useState("");
    const [desig, setDesig] = useState("Manager");
    const [name, setName] = useState("");
    const [dob, setDob] = useState(new Date());
    const [department, setDepartment] = useState("Finance");
    const [doj, setDoj] = useState(new Date());
    const [gender, setGender] = useState("M");
    const [password, setPassword] = useState("");
    const [edit, setEdit] = useState(false)
    const [employeeData, setEmployeeData] = useState([]);
    const [sc ,setSC] = useState(false);
    useEffect(()=>{
        CustomerService.getCustomer().then((res) => {
            console.log(res.data);
            setEmployeeData(res.data);
            console.log(employeeData)
          }).then(setSC(true));
    },[]);

    useEffect(()=>{
        CustomerService.getCustomer().then((res) => {
            console.log(res.data);
            setEmployeeData(res.data);
            console.log(employeeData)
          }).then(setSC(true));
    },[employeeData]);



    function handleSubmit(e) {
        setSC(false);
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
        CustomerService.getCustomer().then((res) => {
            console.log(res.data);
            setEmployeeData(res.data);
            console.log(employeeData)
          })
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
        <React.Fragment>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Add Customer</button>
            
            <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title" id="exampleModalLabel">Add Customer Data</h1>
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
                                                    <Form.Control type="text" value={empId} onChange={(e) => setEmpId(e.target.value)} />
                                                </Form.Group>
                                            </Col>
                                            <Col>
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
                                </Container>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button variant="primary" data-dismiss="modal" type="submit" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {sc?<CustomerDataManagement data={employeeData}/>:<></>}
        </React.Fragment>
    )
}
