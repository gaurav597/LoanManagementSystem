import React, { useEffect, useState } from "react";
import EmployeeDashboard from "./EmployeeDashboard";
import Table from "react-bootstrap/Table";
import ItemMasterService from "../../services/ItemMasterService";

const ItemPurchased = (props) => {

  const [data, setData] = useState([]);
  useEffect(() => {
    ItemMasterService.getItemsPurchased(props['id']).then((res) => {
      setData(res.data);
      console.log(res.data);
    })
  }, []);


  return (
    <div>
      <br />
      <div
        style={{ color: "white", display: "flex", justifyContent: "center" }}
      >
        <h1>Purchased Items</h1>
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
              <th>Issue ID</th>
              <th>Item Description</th>
              <th>Item Make</th>
              <th>Item Category</th>
              <th>Item Valuation</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr>
                <td>{item.issueId}</td>
                <td>{item.itemDescription}</td>
                <td>{item.itemMake}</td>
                <td>{item.itemCategory}</td>
                <td>{item.itemValuation}</td>
              </tr>
            ))}
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
