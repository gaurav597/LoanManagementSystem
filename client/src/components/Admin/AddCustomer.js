import React, { useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBriefcase, faCalendarAlt, faVenusMars, faKey } from '@fortawesome/free-solid-svg-icons';
import AppContext from '../../Context';
import moment from "moment"

export default function AddCustomer() {
    const {id, empId, setEmpId, dsg, setDsg, name, setName, dob, setDob, dept, setDept, doj, setDoj, gdr, setGdr, password, setPassword, show, setShow} = useContext(AppContext);

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

    return (
        <Container fluid="md" className="py-5">
            <div className="text-center mb-5">
                <hr style={{ width: '50%', opacity: 0.2 }} />
            </div>
            <Form>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="employeeId">
                            <Form.Label><FontAwesomeIcon icon={faUser} className="mr-2" />Employee Id</Form.Label>
                            <Form.Control type="text" value={empId} onChange={changeIdHandler} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Label><FontAwesomeIcon icon={faBriefcase} className="mr-2" />Designation</Form.Label>
                        <Form.Select aria-label="Designation" value={dsg} onChange={changeDsgHandler}>
                            <option value="Manager">Manager</option>
                            <option value="SDE1">SDE1</option>
                            <option value="SDE2">SDE2</option>
                            <option value="SDE3">SDE3</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="employeeName">
                            <Form.Label><FontAwesomeIcon icon={faUser} className="mr-2" />Employee Name</Form.Label>
                            <Form.Control type="text" value={name} onChange={changeNameHandler} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="dateOfBirth">
                            <Form.Label><FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />Date of Birth</Form.Label>
                            <Form.Control type="date" value={moment(dob).format('YYYY-MM-DD')} onChange={changeDobHandler} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="department">
                            <Form.Label><FontAwesomeIcon icon={faBriefcase} className="mr-2" />Department</Form.Label>
                            <Form.Select aria-label="Department" value={dept} onChange={changeDeptHandler}>
                                <option value="Finance">Finance</option>
                                <option value="HR">HR</option>
                                <option value="Sales">Sales</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="dateOfJoining">
                            <Form.Label><FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />Date of Joining</Form.Label>
                            <Form.Control type="date" value={moment(doj).format('YYYY-MM-DD')} onChange={changeDojHandler} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="gender">
                            <Form.Label><FontAwesomeIcon icon={faVenusMars} className="mr-2" />Gender</Form.Label>
                            <Form.Select aria-label="Gender" value={gdr} onChange={changeGdrHandler}>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="O">Other</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="password">
                            <Form.Label><FontAwesomeIcon icon={faKey} className="mr-2" />Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={changePasswordHandler} />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}