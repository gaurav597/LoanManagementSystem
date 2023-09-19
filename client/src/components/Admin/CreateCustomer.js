import {React, useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import CustomerService from '../../services/CDS';
import moment from "moment";

function CreateCustomer() {

    const navigate = useNavigate();

    /*The useParams hook returns an object of key/value pairs of the dynamic params 
    from the current URL that were matched by the <Route path>. Child routes inherit 
    all params from their parent routes.
    */
    const {id} = useParams(); //It fetches the id from the URL.

    //state management. (shortcut: ush)
    const [name, setName] = useState('');
    const [dsg, setDsg] = useState('');
    const [dept, setDept] = useState('');
    const [gdr, setGdr] = useState('');
    const [dob, setDob] = useState('');
    const [doj, setDoj] = useState('');

    //Lifecycle management of the component. (shortcut: ueh)
    //values (id) triggers re render whenever they are updated in your program,
    //you can add multiple values by separating them by commas
    useEffect(()=>{
        if(id!=='_add')
        {
            const Response = CustomerService.getCustomerById(id);
            setName(Response.name);
            setDsg(Response.dsg);
            setDept(Response.dept);
            setGdr(Response.gdr);
            setDob(Response.dob);
            setDoj(Response.doj);
        }
    }, [id]);

    const saveOrUpdateCustomer = (event) => {
        event.preventDefault();
        const customer = {name, dsg, dept, gdr, dob, doj};

        if(id==='_add')
        {
            CustomerService.createCustomers(customer);
            navigate('/CDE');
        }
        else
        {
            CustomerService.updateCustomer(customer, id);
            navigate('/CDE');
        }
    };

  // methods to set value of state
    const changeNameHandler = (event) => {
        setName(event.target.value);
    };

    const changeDsgHandler = (event) => {
        setDsg(event.target.value);
    };

    const changeDeptHandler = (event) => {
        setDept(event.target.value); 
    };

    const changeGdrHandler = (event) => {
        setGdr(event.target.value);
    };

    const changeDobHandler = (event) => {
        setDob(event.target.value);
    };

    const changeDojHandler = (event) => {
        setDoj(event.target.value);
    };

    const cancel = () => {
        navigate('/CDE');
    };

    const getTitle = () => {
        if (id === '_add') {
            return <h1 className="text-center">Add Customer</h1>;
        } else {
            return <h1 className="text-center">Update Customer</h1>;
        }
    };

    return (
        <div>
            <br></br>
            <div className = "container">
                    <div className = "row justify-content-center">
                        <div className = "form-outline col-12mb-4">
                            {getTitle()}
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> Name: </label>
                                        <input placeholder="Customer Name" name="name" className="form-control" 
                                            value={name} onChange={changeNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Dsg: </label>
                                        <input placeholder="Customer Designation" name="dsg" className="form-control" 
                                            value={dsg} onChange={changeDsgHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Dept: </label>
                                        <input placeholder="Department" name="dept" className="form-control" 
                                            value={dept} onChange={changeDeptHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Gdr: </label>
                                        <input placeholder="Gender" name="gdr" className="form-control" 
                                            value={gdr} onChange={changeGdrHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Dob: </label>
                                        <input placeholder="Date_of_Birth" name="dob" type="date" className="form-control" 
                                            value={moment(dob).format('YYYY-MM-DD')} onChange={changeDobHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Doj: </label>
                                        <input placeholder="Date_of_joining" name="doj" type="date"className="form-control" 
                                            value={moment(doj).format('YYYY-MM-DD')} onChange={changeDojHandler}/>
                                    </div>

                                    <button className="btn btn-success" onClick={saveOrUpdateCustomer}>Save</button>
                                    <button className="btn btn-danger" onClick={cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

               </div>
        </div>
    )
}

export default CreateCustomer