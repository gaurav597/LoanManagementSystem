import React from "react";
import "../../styles/Navbar.css";
import Header from "../Header";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CustomerDataManagement from "./CustomerDataManagement";
import LoanCardMaagement from "./LoanCardManagement";
import ItemsMasterData from "./ItemsMasterData";
import AddCustomer from "./AddCustomer";
function AdminDashboard() {
  return (
    <div>
      <Header />
      <Tabs
        defaultActiveKey="custDataMgmt"
        id="uncontrolled-tab-example"
        className="mb-3 navbar justify-content-center"
        style={{ background: "#780078" }}
      >
        <Tab eventKey="custDataMgmt" title="Customer Data Management">
          <AddCustomer/>
        </Tab>
        <Tab eventKey="loanCardMgmt" title="Loan Card Management">
          <LoanCardMaagement />
        </Tab>
        <Tab eventKey="itemsMasterCard" title="Items Master Data">
          <ItemsMasterData />
        </Tab>
      </Tabs>
    </div>
  );
}

export default AdminDashboard;
