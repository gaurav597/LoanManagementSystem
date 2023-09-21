import React from 'react'
import { useState } from 'react';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import LoanCardService from '../../services/LoanCardService';
import LoanCardDataManagement from './LoanCardDataManagement';

function AddLoanCard() {

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
    <React.Fragment>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg-customer">Add Customer</button>
            
            <div class="modal fade bd-example-modal-lg-customer" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
        <LoanCardDataManagement/>
        </React.Fragment>
  )
}

export default AddLoanCard;
