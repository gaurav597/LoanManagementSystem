import axios from "axios";

class CustomerService {
    static async addCustomer(customer){
        console.log("it is reaching here");
        return await axios.post('http://localhost:8085/lms/api/addCustomer', customer);
    }

}

export default CustomerService;