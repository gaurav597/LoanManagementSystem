import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/Registration.css";
import AuthenticationService from '../services/AuthenticationService';

const Registration = () => {
    const history = useNavigate();
    //defining state
    const [dealer, setDealer] = useState({
        employeeId: '',
        employeeName: '',
        gender: '',
        password: '',
        dateOfBirth: '',
        dateOfJoin: '',
        designation: '',
    });
    const [errors, setErrors] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    /*
The JavaScript spread operator (...) allows us to quickly copy all or 
part of an existing array or object into another array or object.
*/
    //Updates the state of a dealer Object when user enters data in the input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setDealer((prevDealer) => ({
                ...prevDealer,
                [parent]: {
                    ...prevDealer[parent],
                    [child]: value
                }
            }));
        } else {
            setDealer((prevDealer) => ({
                ...prevDealer,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            try {
                await AuthenticationService.register(dealer);
                setSuccessMessage('Registration successful!');
                alert("Registration Successfull");
                setTimeout(() => {
                    history('/login'); // navigates to Login Component
                }, 3000);

            }

            catch (error) {
                setSuccessMessage('An error occurred during registration.');
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = () => {
        let validationErrors = {};

        if (!dealer.employeeId) {
            validationErrors.employeeId = 'User ID is required.';
        }
        if (!dealer.employeeName) {
            validationErrors.employeeName = 'Name is required.';
        }
        else if (!/^[a-zA-Z]*$/.test(dealer.employeeName)) {
            validationErrors.employeeName = 'Enter Alphabets Only';
        }

        if (!dealer.password) {
            validationErrors.password = 'Password is required.';
        } else if (dealer.password.length < 6) {
            validationErrors.password = 'Password must be at least 6 characters.';
        }

        if (!dealer.dateOfBirth) {
            validationErrors.dateOfBirth = 'Date of Birth is required.';
        }

        if (!dealer.dateOfJoin) {
            validationErrors.dateOfJoin = 'Date of Joining is required.';
        }

        if (!dealer.designation) {
            validationErrors.designation = 'Designation is required';
        }

        return validationErrors;
    };


    return (
        <div>
            <br /> <br />
            <div className='registration-container'>
                <h2 style={{ color: "brown" }}> Employee Registration </h2>
                {successMessage && <p className='success-message'>{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>User ID:</label>
                        <input
                            type="text"
                            name="employeeId"
                            value={dealer.employeeId}
                            onChange={handleChange}
                            className={errors.employeeId && 'error'}
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="employeeName"
                            value={dealer.employeeName}
                            onChange={handleChange}
                            className={errors.employeeName && 'error'}
                        />
                        {errors.employeeName && <p className="error-message">{errors.employeeName}</p>}
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={dealer.password}
                            onChange={handleChange}
                            className={errors.password && 'error'}
                        />
                        {errors.password && <p className="error-message">{errors.password}</p>}
                    </div>

                    <div className="form-group">
                        <label>Date of Birth:</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={dealer.dateOfBirth}
                            onChange={handleChange}
                            className={errors.dateOfBirth && 'error'}
                        />
                        {errors.dateOfBirth && <p className="error-message">{errors.dateOfBirth}</p>}
                    </div>
                    <div className="form-group">
                        <label>Date of Join:</label>
                        <input
                            type="date"
                            name="dateOfJoin"
                            value={dealer.dateOfJoin}
                            onChange={handleChange}
                            className={errors.dateOfJoin && 'error'}
                        />
                        {errors.dateOfJoin && <p className="error-message">{errors.dateOfJoin}</p>}
                    </div>
                    <div className="form-group">
                        <label>Designation</label>
                        <input
                            type="text"
                            name="designation"
                            value={dealer.designation}
                            onChange={handleChange}
                            className={errors.designation && 'error'}
                        />
                        {errors.designation && <p className="error-message">{errors.designation}</p>}
                    </div>

                    <div className="form-group">
                        <button type="submit" className="submit-button">
                            Register
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Registration