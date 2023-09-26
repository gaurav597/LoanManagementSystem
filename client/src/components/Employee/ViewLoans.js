import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import LoanService from "../../services/LoanService";
const ViewLoans = (props) => {

  const [loans, setLoans] = useState([]);

  useEffect(() => {
    LoanService.getLoanById(props['id']).then((response) => {
      setLoans([...response.data.filter(loan => {
        if (loan.employeeId == props['id']) return loan;
      })
      ])
    })
  });

  return (
    <div>
      <br />
      <div
        style={{ color: "white", display: "flex", justifyContent: "center" }}
      >
        <h1>Loan Cards Availed</h1>
      </div>
      <br />

      <div className="row justify-content-center">

        <div class="row d-flex text-center" style={{ color: "white", display: "flex", justifyContent: "center" }}>
          <div class="col-lg-4" style={{ justifyContent: "center" }}>
            <span style={{ fontSize: "16px" }}><b>Employee ID: {props['id']}</b></span>
          </div>
          <div class="col-lg-4">
            <span style={{ fontSize: "16px" }}><b>Designation: {props['des']}</b></span>
          </div>
          <div class="col-lg-4">
            <span style={{ fontSize: "16px" }}><b>Department: {props['dept']}</b></span>
          </div>
        </div>
        <br /><br /><br />
        <Table striped bordered hover
          style={{ width: "50%", borderRadius: "20px", backgroundColor: "#77dd77", textAlign: "center" }}
        >
          <thead class="table-success">
            <tr>
              <th>Loan ID</th>
              <th>Loan Type</th>
              <th>Duration (in years)</th>
              <th>Card Issue Date</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "white" }}>
            {loans.map((loan, index) => (
              <tr key={index} >
                <td> {loan.loanId} </td>
                <td> {loan.loanType} </td>
                <td> {loan.durationInYears} </td>
                <td> {loan.cardIssueDate} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ViewLoans;
