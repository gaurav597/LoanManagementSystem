import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";

const ViewLoans = (props) => {
  const [loans, setLoans] = useState([]);
  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = () => {
    // LoanService.getLoanById().then((Response) => {
    //     setProducts(Response.data); //setting response to state (products)
    // })
  };
  return (
    <div>
      <br />
      <div
        style={{ color: "white", display: "flex", justifyContent: "center" }}
      >
        <h3>Loan Cards Availed</h3>
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
        <Table striped bordered hover style={{ width: "50%" }}>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Loan Type</th>
              <th>Duration (in years)</th>
              <th>Card Issue Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1001</td>
              <td>Housing</td>
              <td>2</td>
              <td>23/10/2022</td>
            </tr>
            {/* {loans.map((loan) => (
              <tr key={loan.id}>
                <td> {loan.id} </td>
                <td> {loan.type} </td>
                <td> {loan.duration} </td>
                <td> {loan.IssueDt} </td>
              </tr>
            ))} */}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ViewLoans;
