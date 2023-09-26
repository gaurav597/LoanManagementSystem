import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import LoanService from "../../services/LoanService";
import AppContext from "../../Context";
import ApplyLoanService from "../../services/ApplyLoanService";
import ApplyLoan from "./ApplyLoan";
const ViewLoans = (props) => {

  const [loans, setLoans] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("none");

  const [itemId, setItemId] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemValue, setItemValue] = useState("");
  const [issueStatus, setIssueStatus] = useState("Y");
  const [itemMake, setItemMake] = useState("");
  const [issueId, setIssueId] = useState("");
  const [employeeId, setEmployeeId] = useState(props[id]);
  const [issueDate, setIssueDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [itemIds, setItemIds] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    LoanService.getLoanById(props['id']).then((response) => {
      setLoans([...response.data.filter(loan => {
        if (loan.employeeId == props['id']) return loan;
      })
      ])
    })
  });

  useEffect(() => {
    if (id === "none") {
      setItemId("");
      setItemCategory("");
      setItemDescription("");
      setItemValue("");
      setIssueStatus("Y");
      setItemMake("");
      setIssueId("");
      setEmployeeId(props['id']);
      setIssueDate("");
      setReturnDate("");
      setItemIds([]);
      setSuccessMessage("");
    }
  }, [id]);

  const applyLoan = () => {
    setId("add");
    setShow(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id === "add") {
      const Payload = {
        itemId,
        itemDescription,
        issueStatus,
        itemMake,
        itemCategory,
        issueId,
        employeeId,
        itemValuation: itemValue
      }
      try {
        const res = await ApplyLoanService.applyLoan(Payload);
        if (res.status === 200) {
          alert("Loan Applied Successfully");
          setSuccessMessage("Loan Applied successfully!");
        }
      }
      catch (error) {
        console.error(error)
      }
      setId("none");
      setShow(false);
    }
  }

  const handleCancel = () => {
    setId("none");
    setShow(false);
  }

  return (
    <div>
      <AppContext.Provider value={{
        itemId, setItemId,
        itemCategory, setItemCategory,
        itemDescription, setItemDescription,
        itemValue, setItemValue,
        issueStatus, setIssueStatus,
        itemMake, setItemMake,
        issueId, setIssueId,
        employeeId, setEmployeeId,
        issueDate, setIssueDate,
        returnDate, setReturnDate,
        itemIds, setItemIds,
        successMessage, setSuccessMessage
      }}>
        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <div class="ml-4 pl-3">
                  <h2> Apply for Loan</h2>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                {show ? <div className='container'>
                  <ApplyLoan />
                </div> : <></>}
              </div>
              <div class="modal-footer">
                <button className="btn btn-success" data-dismiss='modal' onClick={handleSubmit}>Apply</button>
                <button className="btn btn-danger" data-dismiss='modal' onClick={handleCancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </AppContext.Provider>
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
        <br /><br />

        <div className="d-flex justify-content-center mt-3 mb-4">
          <button className='btn btn-info w-auto' data-toggle='modal' data-target=".bd-example-modal-lg" onClick={applyLoan}>Apply for Loan</button>
        </div>

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
