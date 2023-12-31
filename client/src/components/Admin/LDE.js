import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import LoanService from '../../services/LDS'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminDashboard from './AdminDashboard';
import AppContext from '../../Context';
import AddLoan from './AddLoan';

function LDE() {
    const history = useNavigate();

    const [loans, setLoans] = useState([]);
    const [message, setMessage] = useState('');

    const [id, setId] = useState("_none")
    const [loanId, setLoanId] = useState("");
    const [type, setType] = useState("Furniture");
    const [dur, setDur] = useState(0);
    const [show, setShow] = useState(false);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        fetchLoanData();
        setShow(false);
        setChanged(false);
    }, [changed]);

    useEffect(() => {
        console.log(id);
        if (id === "_none") {
            setShow(false);
            setLoanId("");
            setType("Furniture");
            setDur("0");
            console.log('loli');
        }
        else if (id !== '_add') {
            const Response = LoanService.getLoanById(id).then((Response) => {
                setLoanId(Response.data.loanId);
                setType(Response.data.loanType);
                setDur(Response.data.durationInYears);
                setShow(true)
                console.log('lol', Response);
            });
        }
        else {
            setLoanId("");
            setType("Furniture");
            setDur("0");
            setShow(true)
            console.log('lolli');
        }
    }, [id]);

    const fetchLoanData = () => {
        LoanService.getLoans().then((Response) => {
            console.log(Response.data);
            setLoans(Response.data);
        })
    }

    const addLoan = () => {
        setId("_add");
        setShow(true);
        console.log('hihihi');
        // history('/addLoan/_add'); //Navigates to CreateLoan component and passes '_add' as parameter.
    }

    const editLoan = (lid) => {
        setId(lid);
        console.log('hihi');
        // history(`/addLoan/${id}`); //Navigates to CreateLoan component and passes 'id' as parameter.
    }

    const deleteLoan = (lid) => {
        LoanService.deleteLoan(lid).then(() => {
            fetchLoanData();
            setMessage('Loan deleted successfully.');
            //Clear the message after 2 seconds.
            setTimeout(() => {
                setMessage('');
            }, 2000);
            setChanged(true);
        });
    }

    const editButton = (data) => {
        return (
            <button className='btn btn-success' data-toggle='modal' data-target=".bd-example-modal-lg-loan" onClick={() => editLoan(data.loanId)}>
                <span>
                    <FontAwesomeIcon icon="edit" />
                </span>
            </button>
        )
    }

    const deleteButton = (data) => {
        return (
            <button className='btn btn-danger' onClick={() => deleteLoan(data.loanId)}>
                <span>
                    <FontAwesomeIcon icon="trash" />
                </span>
            </button>
        )
    }

    const saveOrUpdateLoan = (event) => {
        event.preventDefault();
        const loan = { "loanId": loanId, "loanType": type, "durationInYears": dur };

        if (id === '_add') {
            LoanService.addLoan(loan).then((Response) => {
                console.log(Response)
            })
            console.log("reaching here");
            setId("_none");
            setShow(false);
            setChanged(true);
            // history('/LDE');
        }
        else if (id !== "_none") {
            console.log("lol", loan);
            LoanService.updateLoan(loan, id).then(() => {
                // history('/LDE');
            });
            setId("_none");
            setShow(false);
            setChanged(true);
        }
    };

    const getTitle = () => {
        if (id === '_add') {
            return <h1 className="modal-title">Add Loan</h1>;
        } else {
            return <h1 className="modal-title">Update Loan</h1>;
        }
    };

    const cancel = () => {
        // history('/CDE');
        setId("_none");
        setShow(false);
    };

    return (
        <React.Fragment>
            <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto" style={{ justifyContent: "center", fontFamily: "Libre Baskerville" }}>
                <div class="modal fade bd-example-modal-lg-loan" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                {getTitle()}
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                {show ? <div className='container'>
                                    <AppContext.Provider value={{ id, loanId, setLoanId, type, setType, dur, setDur }}>
                                        <AddLoan />
                                    </AppContext.Provider>
                                </div> : <></>}
                                <div class="modal-footer">
                                    <button className="btn btn-success" data-dismiss='modal' onClick={saveOrUpdateLoan}>Submit</button>
                                    <button className="btn btn-danger" data-dismiss='modal' onClick={cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div class="card card0" style={{ borderRadius: "35px", justifyContent: "center", paddingLeft: "120px", paddingRight: "120px" }}>
                    <br /><br />
                    <div className="text-center mb-4" style={{ color: "black", display: "flex", justifyContent: "center" }}>
                        <h1>Loan Master Data Details</h1>
                    </div>

                    <div className="d-flex justify-content-center mt-3 mb-4">
                        <button className='btn btn-info w-auto' data-toggle='modal' data-target=".bd-example-modal-lg-loan" onClick={addLoan}>Add Loan</button>
                    </div>
                    <br />
                    <div className="d-flex justify-content-center">
                        <div className="table-responsive" style={{ width: "80%" }}> {/* Adjust width as needed */}
                            <table className="table table-bordered table-striped table-hover w-100"
                                style={{ borderRadius: "20px", textAlign: "center" }}>
                                <thead className="table-success">
                                    <tr>
                                        <th style={{ width: "20%" }}>Loan Id</th>
                                        <th style={{ width: "40%" }}>Loan Type</th>
                                        <th style={{ width: "20%" }}>Duration</th>
                                        <th style={{ width: "20%" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* ... Your existing mapping code ... */}
                                    {loans && loans.map(loan =>
                                        <tr key={loan.id}>
                                            <td>{loan.loanId}</td>
                                            <td>{loan.loanType}</td>
                                            <td>{loan.durationInYears} years</td>
                                            <td>
                                                <button className='btn btn-success mr-2' data-toggle='modal' data-target=".bd-example-modal-lg-loan" onClick={() => editLoan(loan.loanId)}>
                                                    <FontAwesomeIcon icon="edit" />
                                                </button>
                                                <button className='btn btn-danger' onClick={() => deleteLoan(loan.loanId)}>
                                                    <FontAwesomeIcon icon="trash" />
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <br /><br />
                        </div>
                    </div>
                    {message && <div className='alert alert-success mt-3 text-center'>{message}</div>}
                </div>
            </div>
        </React.Fragment>
    )
}

export default LDE;