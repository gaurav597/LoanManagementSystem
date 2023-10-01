import axios from 'axios'

const CRA_URL = 'http://localhost:8085/lms/api';

class CustomerService {

    static getCustomers()
    {
        return axios.get(CRA_URL+'/getCustomer');
    }

    static addCustomer(customer)
    {
        return axios.post(CRA_URL+'/addCustomer', customer);
    }

    static getCustomerById(empId)
    {
        return axios.get(CRA_URL+'/getCustomer/'+empId);
    }

    static updateCustomer(customer, empId)
    {   console.log("reaching here"+ customer);
        return axios.put(CRA_URL+'/addCustomer/'+empId, customer);
    }

    static deleteCustomer(empId)
    {
        return axios.delete(CRA_URL+'/deleteCustomer/'+empId);
    }
}

export default CustomerService