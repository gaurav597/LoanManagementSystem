import React from 'react'
import { useState } from 'react';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import LoanCardService from '../../services/LoanCardService';
import Header from '../Header';

function LoanCardManagement() {

  const [loanId, setLoanId] = useState("");
  const [loanType, setLoanType] = useState("");
  const [duration, setDuration] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    const LoanCard = {
      loanId,
      loanType,
      durationInYears: duration
    }

    LoanCardService.addLoanCard(LoanCard).then((response) => { console.log(response) });

  }
  return (
    <div>
      <Header />
      <Container fluid="md">
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Loan Id</Form.Label>
            <Form.Control type="text" value={loanId} onChange={(e) => setLoanId(e.target.value)} />
          </Form.Group>
          <Form.Label>Loan Type</Form.Label>
          <Form.Select aria-label="Default select example" onChange={(e) => setLoanType(e.target.value)}>
            <option value="Furniture">Furniture</option>
            <option value="Stationary">Stationary</option>
            <option value="Crockery">Crockery</option>
          </Form.Select>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Duration</Form.Label>
            <Form.Control type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
          </Form.Group>
        </Form>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Container>
    </div>
  )
}

export default LoanCardManagement
