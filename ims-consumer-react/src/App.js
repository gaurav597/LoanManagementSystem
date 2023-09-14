import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import Registration from './components/Registration';
import Login from './components/Login';
import CreateProduct from './components/CreateProduct';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

/*To use the Font-awesome, install all given packages from npm into your app.

npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/react-fontawesome

 * And import the library for the font-awesome

*/

import {library} from '@fortawesome/fontawesome-svg-core';
import {faSignIn, faCameraRetro} from '@fortawesome/free-solid-svg-icons';
import Product from './components/Product';
library.add(faSignIn, faCameraRetro);


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Inventory Management System</h1>
      </header>
      <section>
        <div style={{
          backgroundImage: 'url(../public/images/download.jpg)',
          bacgroundSize: 'cover'
        }}>
        <Router>
          <NavBar />

          <Routes>
            <Route path='/register' element={<Registration />} />
            <Route path='/login' element={<Login />} />

            <Route path='/product' element={<Product />} />

            <Route path='/addProduct/:id' element={<CreateProduct />} />
          </Routes>
        </Router>
        </div>
      </section>
    </div>
  );
}

export default App;
