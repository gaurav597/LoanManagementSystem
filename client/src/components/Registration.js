import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/Registration.css";
import AuthenticationService from '../services/AuthenticationService';
import NavBar from './NavBar';
import { Button } from 'react-bootstrap';
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
            <NavBar />
            <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
                <div class="card card0 border-0">
                    <div class="row d-flex">
                        <div class="col-lg-6">
                            <div class="border-line">
                                <div class="card2 card border-0 ">
                                    <div class="card2 card border-0 px-4 py-5">
                                        {successMessage && <p className='success-message'>{successMessage}</p>}
                                        <form onSubmit={handleSubmit}>
                                            <div>
                                                <label>User ID:</label>
                                                <input
                                                    type="text"
                                                    name="employeeId"
                                                    value={dealer.employeeId}
                                                    onChange={handleChange}
                                                    class="mb-3"
                                                    className={errors.employeeId && 'error'}
                                                />
                                                {errors.email && <p className="error-message">{errors.email}</p>}
                                            </div>
                                            <div>
                                                <label>Name</label>
                                                <input
                                                    type="text"
                                                    name="employeeName"
                                                    class="mb-3"
                                                    value={dealer.employeeName}
                                                    onChange={handleChange}
                                                    className={errors.employeeName && 'error'}
                                                />
                                                {errors.employeeName && <p className="error-message">{errors.employeeName}</p>}
                                            </div>
                                            <div class="row d-flex">
                                                <div class="col-lg-6">
                                                    <label>Password:</label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        class="mb-3"
                                                        value={dealer.password}
                                                        onChange={handleChange}
                                                        className={errors.password && 'error'}
                                                    />
                                                    {errors.password && <p className="error-message">{errors.password}</p>}
                                                </div>
                                                <div class="col-lg-6">
                                                    <label>Confirm Password:</label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        class="mb-3"
                                                        value={dealer.password}
                                                        onChange={handleChange}
                                                        className={errors.password && 'error'}
                                                    />
                                                    {errors.password && <p className="error-message">{errors.password}</p>}
                                                </div>
                                            </div>
                                            <div class="row d-flex">
                                                <div class="col-lg-6">
                                                    <label>Date of Birth:</label>
                                                    <input
                                                        type="date"
                                                        name="dateOfBirth"
                                                        class="mb-3"
                                                        value={dealer.dateOfBirth}
                                                        onChange={handleChange}
                                                        className={errors.dateOfBirth && 'error'}
                                                    />
                                                    {errors.dateOfBirth && <p className="error-message">{errors.dateOfBirth}</p>}
                                                </div>
                                                <div class="col-lg-6">
                                                    <label>Date of Join:</label>
                                                    <input
                                                        type="date"
                                                        name="dateOfJoin"
                                                        class="mb-3"
                                                        value={dealer.dateOfJoin}
                                                        onChange={handleChange}
                                                        className={errors.dateOfJoin && 'error'}
                                                    />
                                                    {errors.dateOfJoin && <p className="error-message">{errors.dateOfJoin}</p>}
                                                </div>
                                            </div>
                                            <div class="row d-flex">
                                                <div class="col-lg-6">
                                                    <label>Designation</label>
                                                    <input
                                                        type="text"
                                                        name="designation"
                                                        class="mb-4"
                                                        value={dealer.designation}
                                                        onChange={handleChange}
                                                        className={errors.designation && 'error'}
                                                    />
                                                    {errors.designation && <p className="error-message">{errors.designation}</p>}
                                                </div>
                                                <div class="col-lg-6">
                                                    {/* <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Gender</Form.Label>
                                                    <Form.Select aria-label="Default select example" onChange={handleChange}>
                                                        <option value="M">Male</option>
                                                        <option value="F">Female</option>
                                                        <option value="O">Other</option>
                                                    </Form.Select>
                                                </Form.Group> */}
                                                    {errors.gender && <p className="error-message">{errors.gender}</p>}
                                                </div>
                                            </div>
                                            <div> <div class="row mb-3 px-3">
                                                <button style={{
                                                    background: "#322333",
                                                    color: "white",
                                                    borderRadius: "5px"
                                                }}
                                                > Register </button>
                                            </div>
                                                <div class="row mb-4 px-3">
                                                    <small class="font-weight-bold">Already have an account? <a class="text-danger "> <Link to="/login"> Login </Link></a></small>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="card1 pb-5">
                                <br /> <br />  <br /> <br />  <br /> <br />  <br />
                                <div class="row px-3 justify-content-center mt-4 mb-5 border-line">
                                    <img src="https://img.freepik.com/free-vector/premium-cash-reward-bonus-work-done-best-employee-rewarding-promotion-order-efficiency-stimulation-boss-subordinate-cartoon-characters_335657-2984.jpg?w=2000" class="image" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </div >
    )
}

export default Registration