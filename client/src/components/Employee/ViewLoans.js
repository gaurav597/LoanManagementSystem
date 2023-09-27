import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import LoanService from "../../services/LoanService";
import AppContext from "../../Context";
import ApplyLoanService from "../../services/ApplyLoanService";
import ApplyLoan from "./ApplyLoan";
import { useContext } from "react";
import "../../styles/Login.css"
const ViewLoans = (props) => {

  const [loans, setLoans] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("none");
  const [errors, setErrors] = useState("");

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
  const { itemPur, setItemPur } = useContext(AppContext);


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
      setErrors("");
    }
  }, [id]);

  const applyLoan = () => {
    setId("add");
    setShow(true);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const val = validateForm();
    if (id === "add" && Object.keys(val).length === 0) {
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
    else {
      setErrors(val);
      setShow(true);
    }
  }

  const handleCancel = () => {
    setId("none");
    setShow(false);
  }

  const validateForm = () => {
    let validationErrors = {};
    console.log("here")
    if (!employeeId) {
      validationErrors.employeeId = "Employee ID is required";
    }
    if (!issueId) {
      validationErrors.issueId = "Issue ID is required";
    }
    if (!itemIds) {
      validationErrors.itemIds = "Item ID is required";
    }
    return validationErrors;
  }

  return (
    <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto" style={{ justifyContent: "center", fontFamily: "Libre Baskerville" }}>
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
        successMessage, setSuccessMessage,
        errors, setErrors,
      }}>
        {show ?
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
                  <div className='container'>
                    <ApplyLoan />
                  </div>
                </div>
                <div class="modal-footer">
                  <button className="btn btn-success" data-dismiss={'modal'} onClick={handleSubmit.bind(this)}>Apply</button>
                  <button className="btn btn-danger" data-dismiss='modal' onClick={handleCancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                </div>
              </div>
            </div>
          </div> : <></>}
      </AppContext.Provider>
      <br />
      <div class="card card0" style={{ borderRadius: "35px", justifyContent: "center", paddingLeft: "120px", paddingRight: "120px" }}>
        <br /> <br />
        <div
          style={{ color: "black", display: "flex", justifyContent: "center" }}
        >
          <h1>Loan Cards Availed</h1>
        </div>
        <br />

        <div className="row justify-content-center">

          <div class="row d-flex text-center" style={{ color: "black", display: "flex", justifyContent: "center" }}>
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
            style={{ width: "70%", borderRadius: "20px", backgroundColor: "#77dd77", textAlign: "center" }}
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
        <br /> <br />
      </div>
    </div>
  );
};

export default ViewLoans;
