import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import LoanService from '../../services/LDS';
import AdminDashboard from './AdminDashboard';
import { useNavigate, useParams } from 'react-router-dom';

function AddLoan()
{
  const navigate = useNavigate();
  const {id} = useParams();

  const [loanId, setLoanId] = useState("");
  const [type, setType] = useState("Furniture");
  const [dur, setDur] = useState(0);

useEffect(()=>{
  if(id!=='_add')
  {
    const Response = LoanService.getLoanById(id).then((Response)=>{
      setLoanId(Response.data.loanId);
      setType(Response.data.loanType);
      setDur(Response.data.durationInYears);
    });
  }
}, [id]);

const saveOrUpdateLoan = (event) => {
  event.preventDefault();
  const loan = {"loanId": loanId, "loanType": type, "durationInYears": dur};

  if(id==='_add')
  {
    LoanService.addLoan(loan).then((Response)=>{
      console.log("lol", Response)
    })
    navigate('/LDE');
  }
  else
  {
    LoanService.updateLoan(loan, id).then(()=>{
      navigate('/LDE');
    });
  }
};

const changeIdHandler = (event) => {
  setLoanId(event.target.value);
}
const changeTypeHandler = (event) => {
  setType(event.target.value);
};

const changeDurHandler = (event) => {
  setDur(event.target.value);
};

const cancel = () => {
  navigate('/LDE');
};

const getTitle = () => {
  if (id==='_add') {
      return <h1 className="text-center" style={{color: "white"}}>Add Loan</h1>;
  } else {
      return <h1 className="text-center" style={{color: "white"}}>Update Loan</h1>;
  }
};

  return (
    <div>
      {getTitle()}
      <Container fluid="md">
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Loan Id</Form.Label>
            <Form.Control type="text" value={loanId} onChange={changeIdHandler} />
          </Form.Group>
          <Form.Label>Loan Type</Form.Label>
          <Form.Select aria-label="Default select example" value={type} onChange={changeTypeHandler}>
            <option value="Furniture">Furniture</option>
            <option value="Stationary">Stationary</option>
            <option value="Crockery">Crockery</option>
          </Form.Select>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Duration</Form.Label>
            <Form.Control type="text" value={dur} onChange={changeDurHandler} />
          </Form.Group>
        </Form>
        <button className="btn btn-success" onClick={saveOrUpdateLoan}>Submit</button>
        <button className="btn btn-danger" onClick={cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
      </Container>
    </div>
  )
}

export default AddLoan
