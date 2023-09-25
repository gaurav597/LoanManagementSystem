import React, { useEffect } from 'react'
import { useState } from 'react';
import CustomerService from '../../services/CustomerService';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useNavigate } from 'react-router-dom';

function LoanCardDataManagement(props) {
  
  const history = useNavigate(); 
  const [loanId, setLoanId] = useState("");
  const [loanType, setLoanType] = useState("Furniture");
  const [duration, setDuration] = useState(0);
  const [loanData,setLoanData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setLoanData(props["data"]);
  }, [props]);

  function handleDelete(empId) {
    console.log(empId);
    CustomerService.deleteCustomer(empId).then((res) => {
      console.log(res);
    })
  }
  
  function handleSubmit(e){
    e.preventDefault();

  }


  const handleEdit = (item) => {
    console.log("Its working");
  
  }


  return (
    <React.Fragment>
        {/* <div class="modal fade bd-example-modal-lg-custom" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
        </div> */}
      <div class="container-fluid">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Loan Id</th>
              <th scope="col">Loan Type</th>
              <th scope="col">Duration</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {loanData.map((item) => (
              <tr>
                <th scope="row">{item.loanId}</th>
                <td>{item.loanType}</td>
                <td>{item.durationInYears}</td>
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

export default LoanCardDataManagement
