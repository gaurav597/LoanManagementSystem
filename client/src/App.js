import logo from './logo.svg';
import './App.css';


import Login from './pages/login/login';
import AdminDashBoard from './pages/AdminDashBoard/AdminDashBoard'
import { Fragment } from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/adminDashBoard" element={<AdminDashBoard/>}/>
    </Routes>
    </BrowserRouter>
    // <BrowserRouter>
    // <Routes>
    //   <Route path="/" element={<Login/>}/>
    //   <Route path="/adminDashBoard" element={<AdminDashBoard/>}/>
    // </Routes>
    // </BrowserRouter>
   
    
  );
}

export default App;
