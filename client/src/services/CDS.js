import axios from 'axios'

const CRA_URL = 'dummy';
var dummy_customers = {"data": [{"eid": "0", "name": "abc", "dsg": "Manager", "dpt": "Finance", "gdr": "Male", "dob": "1973-01-01", "doj": "2000-01-01"}, {"eid": "1", "name": "abcd", "dsg": "Executive", "dpt": "Finance", "gdr": "Female", "dob": "1973-02-01", "doj": "2000-02-01"}]};

class CustomerService {

    static getCustomers()
    {
        // return axios.get(CRA_URL);
        return dummy_customers;
    }

    static createCustomers(customer)
    {
        // return axios.post(CRA_URL, customer);
        dummy_customers.data.push(customer);
        dummy_customers.data[dummy_customers.data.length-1]['eid'] = '0';
    }

    static getCustomerById(empId)
    {
        for(var i=0; i<dummy_customers.data.length; i++)
        {
            if(empId==dummy_customers.data[i].eid)
            {
                return dummy_customers.data[i];
            }
        }
    }

    static updateCustomer(customer, empId)
    {
        // return axios.put(CRA_URL+'/'+empId, customer);
        for(var i=0; i<dummy_customers.data.length; i++)
        {
            if(empId==dummy_customers.data[i].eid)
            {
                dummy_customers.data[i] = customer;
                dummy_customers.data[i]['eid'] = empId;
            }
        }
    }

    static deleteCustomer(empId)
    {
        // return axios.delete(CRA_URL+'/'+empId);
        for(var i=0; i<dummy_customers.data.length; i++)
        {
            if(empId==dummy_customers.data[i].eid)
            {
                delete dummy_customers.data[i];
            }
        }
    }
}

export default CustomerService