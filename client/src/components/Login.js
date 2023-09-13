import React, { useState } from 'react'
import "../styles/Login.css"
import { useNavigate } from 'react-router-dom';

import AuthenticationService from '../services/AuthenticationService';
const Login = () => {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessmMg] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMsg('Please enter email and password');
            return;
        }
        const dealer = { email, password };
        try {
            const loginSuccess = await AuthenticationService.login(dealer);
            console.log('API Response', loginSuccess.data);
            if (loginSuccess) {
                setSuccessmMg('Login Successful! Redirecting...')
                setTimeout(() => {
                    history('/products') // on successful login navigate to product component
                }, 500)
            }
            else {
                setErrorMsg('Invakid Email or Password')
            }
        }
        catch (error) {
            console.log('Login Error: ', error);
            setErrorMsg('Error occured during login');

        }
    }

    return (
        <div>
            <br /> <br />
            <div className='container'>
                <h2 style={{ color: "green" }}>Dealer Login</h2>
                <div className='form-group'>
                    <label> Email: </label>
                    <input type='email' className='form-control' value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                </div>
                <div className='form-group'>
                    <label> Password: </label>
                    <input type='password' className='form-control' value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                </div>
                <button className='btn btn-primary' onClick={handleLogin}>Login </button>
                {errorMsg && <p className='error-message'>{errorMsg}</p>}
                {successMsg && <p className='success-message'>{successMsg}</p>}
            </div>
        </div>
    )
}

export default Login