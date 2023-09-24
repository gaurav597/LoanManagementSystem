import React from "react";
import "../../styles/Navbar.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ViewLoans from "./ViewLoans";
import ApplyLoan from "./ApplyLoan";
import ItemPurchased from "./ItemPurchased";
import NavBar from "../NavBar";
import "../../styles/Navbar.css"
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
const EmployeeDashboard = () => {
  const auth = useAuth();
  const location = useLocation();
  const data = location.state;
  return (
    <div>
      <NavBar />
      <Tabs
        defaultActiveKey="viewLoans"
        id="uncontrolled-tab-example"
        className="mb-3 navbar justify-content-center tabBg"
      >
        <Tab eventKey="viewLoans" title="View Loans">
          <ViewLoans id={auth.user} des={data[0]} dept={data[1]} />
        </Tab>
        <Tab eventKey="applyLoans" title="Apply Loans">
          {/* <ApplyLoan /> */}
        </Tab>
        <Tab eventKey="itemsPurchased" title="View Items Purchased">
          {/* <ItemPurchased id={auth.user} des={data[0]} dept={data[1]} /> */}
        </Tab>
      </Tabs>
    </div>
  );
};

export default EmployeeDashboard;
