import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSign, faCameraRetro, faPeopleGroup, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import AddCustomer from './components/Admin/AddCustomer';
import AdminDashboard from './components/Admin/AdminDashboard'
import AddLoan from './components/Admin/AddLoan';
import AddItem from './components/Admin/AddItem';
import EmployeeDashboard from './components/Employee/EmployeeDashboard';
import ViewLoans from './components/Employee/ViewLoans';
import ApplyLoan from './components/Employee/ApplyLoan';
import ItemPurchased from "./components/Employee/ItemPurchased";

import CDE from './components/Admin/CDE';

import LandingPage from './components/LandingPage';
import LDE from './components/Admin/LDE'

import IDE from './components/Admin/IDE'


import { AuthProvider } from './context/AuthContext';
import RequireAuth from './context/RequireAuth';
library.add(faSign, faCameraRetro, faPeopleGroup, faTrash, faEdit);

function App() {
  return (
    <AuthProvider>
      <div className="App bg">
        <section>
          <div style={{
            backgroundSize: 'cover', backgroundRepeat: "no-repeat",
            minHeight: '140vh', minWidth: '100vw'
          }}>
            <Router>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/login" element={<Login />} />

                <Route path="/employeeDashboard" element={<EmployeeDashboard />}/>
                <Route path="/viewLoans" element={<RequireAuth><ViewLoans /></RequireAuth>} />
                <Route path="/applyLoan" element={<ApplyLoan />} />
                <Route path="/itemPurchased" element={<RequireAuth><ItemPurchased /></RequireAuth>} />

                <Route path="/adminDashboard" element={
                <RequireAuth>
                  <AdminDashboard />
                </RequireAuth>
              } />
                <Route path='/CDE' element={
                <RequireAuth>
                  <CDE />
                </RequireAuth>
              } />
                <Route path='/addCustomer/:id' element={
                <RequireAuth>
                  <AddCustomer />
                </RequireAuth>
              } />
                <Route path="/LDE" element={
                <RequireAuth>
                  <LDE />
                </RequireAuth>
              } />
                <Route path="/addLoan/:id" element={
                <RequireAuth>
                  <AddLoan />
                </RequireAuth>
              } />
                <Route path="/IDE" element={
                <RequireAuth>
                  <IDE />
                </RequireAuth>
              } />
                <Route path="/addItem/:id" element={
                <RequireAuth>
                  <AddItem />
                </RequireAuth>
              } />
              </Routes>
            </Router>
          </div>
        </section>
        <footer>
          <div class="row px-3 footer">
            <small class="ml-4 ml-sm-5 mb-2">Copyright &copy; 2023. All rights reserved.</small>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;