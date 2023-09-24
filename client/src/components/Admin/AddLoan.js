import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LoanService from '../../services/LDS';
import AdminDashboard from './AdminDashboard';
import { useNavigate, useParams } from 'react-router-dom';
import AppContext from '../../Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faChair, faClock, faPenFancy } from '@fortawesome/free-solid-svg-icons';

function AddLoan() {
    const { id, loanId, setLoanId, type, setType, dur, setDur } = useContext(AppContext);

    const changeIdHandler = (event) => {
        setLoanId(event.target.value);
    }

    const changeTypeHandler = (event) => {
        setType(event.target.value);
    };

    const changeDurHandler = (event) => {
        setDur(event.target.value);
    };

    return (
        <Container fluid="md" className="py-4">
            <Form>
                <Form.Group className="mb-3" controlId="loanIdInput">
                    <Form.Label><FontAwesomeIcon icon={faCreditCard} className="mr-2" />Loan Id</Form.Label>
                    <Form.Control type="text" value={loanId} onChange={changeIdHandler} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="loanTypeInput">
                    <Form.Label><FontAwesomeIcon icon={faChair} className="mr-2" />Loan Type</Form.Label>
                    <Form.Select aria-label="Loan Type" value={type} onChange={changeTypeHandler}>
                        <option value="Furniture">Furniture</option>
                        <option value="Stationary">Stationary</option>
                        <option value="Crockery">Crockery</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="durationInput">
                    <Form.Label><FontAwesomeIcon icon={faClock} className="mr-2" />Duration</Form.Label>
                    <Form.Control type="text" value={dur} onChange={changeDurHandler} />
                </Form.Group>
            </Form>
        </Container>
    )
}

export default AddLoan;