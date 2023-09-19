import axios from "axios";

class ItemMasterService {

    static applyLoan(Item){
        return axios.post('http://localhost:8085/lms/api/applyLoan',Item);
    }
}

export default ItemMasterService;