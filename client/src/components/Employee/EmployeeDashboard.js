import React from "react";
import "../../styles/Navbar.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ViewLoans from "./ViewLoans";
import ApplyLoan from "./ApplyLoan";
import ItemPurchased from "./ItemPurchased";
import NavBar from "../NavBar";
import { useAuth } from "../../context/AuthContext";
const EmployeeDashboard = () => {
  const auth = useAuth();
  return (
    <div>
      <NavBar />
      <div style={{ color: "white" }}> Employee ID:  {auth.user}</div>
      <Tabs
        defaultActiveKey="viewLoans"
        id="uncontrolled-tab-example"
        className="mb-3 navbar justify-content-center"
        style={{ background: "#780078" }}
      >
        <Tab eventKey="viewLoans" title="View Loans">
          <ViewLoans />
        </Tab>
        <Tab eventKey="applyLoans" title="Apply Loans">
          <ApplyLoan />
        </Tab>
        <Tab eventKey="itemsPurchased" title="View Items Purchased">
          <ItemPurchased />
        </Tab>
      </Tabs>
    </div>
  );
};

export default EmployeeDashboard;
