import React, { useEffect, useState } from "react";
import EmployeeDashboard from "./EmployeeDashboard";
import Table from "react-bootstrap/Table";
import ItemMasterService from "../../services/ItemMasterService";

import "../../styles/Login.css"
const ItemPurchased = (props) => {

import "../../styles/Login.css";
import AppContext from "../../Context";
import { useContext } from "react";



const ItemPurchased = (props) => {
 
  const { itemPur, setItemPur } = useContext(AppContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    ItemMasterService.getItemsPurchased(props['id']).then((res) => {
      setData(res.data);
      console.log(res.data);
    })

  }, [itemPur]);


  return (
    <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto" style={{ justifyContent: "center", fontFamily: "Libre Baskerville" }}>
      <br />
      <div class="card card0" style={{ borderRadius: "35px", justifyContent: "center", paddingLeft: "120px", paddingRight: "120px" }}>
        <br /> <br />
        <div
          style={{ color: "black", display: "flex", justifyContent: "center" }}
        >
          <br /> <br />
          <h1>Purchased Items</h1>
        </div>
        <br />

        <div className="row justify-content-center">
          <div class="row d-flex text-center" style={{ color: "black", display: "flex", justifyContent: "center" }}>

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
          </div>
          <br /><br /> <br />
          <Table striped bordered hover
            style={{ width: "70%", borderRadius: "20px", backgroundColor: "#77dd77", textAlign: "center" }}
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
            </tbody>
          </Table>
        </div>
        <br /> <br /> <br />
      </div>
    </div>
  );
};

export default ItemPurchased;
