import {React, useState, useEffect} from 'react' //imr is the shortcut for a snippet importing react
import '../styles/Login.css'
import { useNavigate } from 'react-router-dom';

import AuthenticationService from '../service/AuthenticationService';

//rafce is the shortcut for a snippet of a react arrow export function.

const Login = () => {

const history = useNavigate();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const [successMessage, setSuccessMessage] = useState('');

const handleLogin = async () => {
    if(!email || !password)
    {
        setErrorMessage('Email and password cannot be left blank');
    }

    const dealer = {email, password};
    try{
        const loginSuccess = await AuthenticationService.login(dealer);
        console.log('API response: ', loginSuccess.data);
    
        if(loginSuccess)
        {
            setSuccessMessage('Login successful');
            setTimeout(() => {
                history('/product');
            }, 200);
        }
        else{
            setErrorMessage('Invalid credentials');
        }
    }
    catch(error)
    {
        console.log('Login error: ', error);
        setErrorMessage('The following error occurred during login: ', error);
    }
}

  return (
    <div>
        <br />
        <div className='container'>
            <h2 style={{color:'green'}}>
                Login
            </h2>
            <div className='form-group'>
                <label>
                    Email: 
                </label>
                <input type='email' className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className='form-group'>
                <label>
                    Password: 
                </label>
                <input type='password' className='form-control' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button className='btn btn-primary' onClick={handleLogin}>
                Login
            </button>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            {successMessage && <p className='success-message'>{successMessage}</p>}
        </div>
    </div>
  )
}

export default Login