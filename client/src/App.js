import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar.js"
import Registration from './components/Registration';
import Login from './components/Login';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSign, faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import LoanDashboard from './components/LoanDashboard';
import AddCustomer from './components/AddCustomer';
import AdminDashboard from './components/AdminDashboard'
import CustomerDataManagement from './components/CustomerDataManagement';
import LoanCardManagement from './components/LoanCardManagement';
import ItemsMasterData from './components/ItemsMasterData';
library.add(faSign, faCameraRetro);
/*
  React Router is a standard library for routing in React. 
  It enables the navigation among views of various components in a React Application, 
  allows changing the browser URL, and keeps the UI in sync with the URL. 

  React Router is a JavaScript framework that lets us handle client and server-side 
  routing in React applications. 
  It enables the creation of single-page web or mobile apps that allow navigating without 
  refreshing the page. 
  It also allows us to use browser history features while preserving the right application
   view.

   Used Version6 of Router

 > npm install react-router-dom --save
*/


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Loan Management System </h1>
       
      </header>
      <section>
        <div style={{
          backgroundColor:"#e2e4da",
          backgroundSize: 'cover', backgroundRepeat: "no-repeat",
          minHeight: '140vh', minWidth: '100vw'
        }}>
          <Router>
            <NavBar />
            <Routes>
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<LoanDashboard />} />
              <Route path="/addCustomer" element={<AddCustomer/>} />
              <Route path="/adminDashboard" element={<AdminDashboard/>} />
              <Route path="/customerDataManagement" element={<CustomerDataManagement/>} />
              <Route path="/loanCardManagement" element={<LoanCardManagement/>} />
              <Route path="/itemsMasterData" element={<ItemsMasterData/>} />

            </Routes>
          </Router>

        </div>
      </section>
      <footer className="footer">
        <p><strong>&copy; All rights reserved </strong> </p>
      </footer>
    </div>
  );
}

export default App;
