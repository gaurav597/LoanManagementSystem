import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CustomerDataManagement from "./CustomerDataManagement";
import LoanCardMaagement from "./LoanCardManagement";
import ItemsMasterData from "./ItemsMasterData";
import AddCustomer from "./AddCustomer";
import AddItem from "./AddItem";
import AddLoanCard from "./AddLoanCard";
import { useAuth } from "../../context/AuthContext";
import NavBar from "../NavBar";
function AdminDashboard() {
  const history = useNavigate();
  const location = useLocation();
  const data = location.state;
  console.log(data);
  const auth = useAuth();
  return (
    <div>
      <NavBar />
      <div style={{ color: "white" }}> Employee ID:  {auth.user}</div>
      <Tabs
        defaultActiveKey="custDataMgmt"
        id="uncontrolled-tab-example"
        className="mb-3 navbar justify-content-center"
        style={{ background: "#780078" }}
      >
        <Tab eventKey="custDataMgmt" title="Customer Data Management">
          <AddCustomer />
        </Tab>
        <Tab eventKey="loanCardMgmt" title="Loan Card Management">
          <AddLoanCard />
        </Tab>
        <Tab eventKey="itemsMasterCard" title="Items Master Data">
          <AddItem />
        </Tab>
      </Tabs>
    </div>
  );
}

export default AdminDashboard;
