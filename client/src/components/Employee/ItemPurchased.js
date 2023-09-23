import React from "react";
import EmployeeDashboard from "./EmployeeDashboard";
import Table from "react-bootstrap/Table";

const ItemPurchased = (props) => {
  return (
     <div>
      <br />
      <div
        style={{ color: "white", display: "flex", justifyContent: "center" }}
      >
        <h3>Purchased Items</h3>
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
              <th>Issue ID</th>
              <th>Item Description</th>
              <th>Item Make</th>
              <th>Item Category</th>
              <th>Item Valuation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1001</td>
              <td>Tea Table</td>
              <td>Wooden</td>
              <td>Furniture</td>
              <td>5000</td>
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

export default ItemPurchased;
