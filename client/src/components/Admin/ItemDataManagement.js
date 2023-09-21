import React, { useEffect } from 'react'
import { useState } from 'react';
import CustomerService from '../../services/CustomerService';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useNavigate } from 'react-router-dom';

function ItemDataManagement() {
  const [empId, setEmpId] = useState("");
    const [desig, setDesig] = useState("Manager");
    const [name, setName] = useState("");
    const [dob, setDob] = useState(new Date());
    const [department, setDepartment] = useState("Finance");
    const [doj, setDoj] = useState(new Date());
    const [gender, setGender] = useState("M");
    const [password, setPassword] = useState("");
  const history = useNavigate();

  const [employeeData, setEmployeeData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  
  function handleSubmit(e){
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
  }


  const handleEdit = (item) => {
    console.log("Its working");
    setIsLoading(true);
    console.log(isLoading);
    setEdit(true);
    setEmpId(item.employeeId);
    setName(item.employeeName);
    setDepartment(item.department);
    setDesig(item.designation);
    setDob(item.dateOfBirth);
    setDoj(item.dateOfJoin);
    setGender(item.gender);
    setPassword(item.password);
    console.log(item);
    console.log(empId);
    console.log(isLoading);
        console.log(desig);
        console.log(name);
        console.log(dob);
        console.log(department);
        console.log(doj);
        console.log(gender);
        console.log(password);
    setIsLoading(false);
    console.log(isLoading);
  }


  return (
    <React.Fragment>
        <div class="modal fade bd-example-modal-lg-custom" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title" id="exampleModalLabel">Add Customer Data</h1>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {isLoading? <></>: <><div class="modal-body">
                <div className='container'>
                  <Container fluid="md">
                    <Form>

                      <Row>
                        <Col>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Employee Id</Form.Label>
                            <Form.Control type="text" value={empId}  readOnly onChange={(e) => setEmpId(e.target.value)} />
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
                            <Form.Control type="password" readOnly value={password} onChange={(e) => { setPassword(e.target.value) }} />
                          </Form.Group>

                        </Col>
                      </Row>

                    </Form>
                  </Container>
                </div>
              </div>
              </>}
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button class="btn btn-primary" type="submit" data-dismiss="modal" onClick={handleSubmit}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      <div class="container-fluid">
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
                <td>{item.dateOfJoin}</td>
                <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg-custom" onClick={(e) => handleEdit(item)}>Edit</button></td>
                <td onClick={(e) => handleDelete(item.employeeId)}>Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

export default ItemDataManagement;
