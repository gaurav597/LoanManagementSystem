import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeDashboard from "./EmployeeDashboard";
import Table from "react-bootstrap/Table";

const ViewLoans = () => {
  const history = useNavigate();
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
