import axios from 'axios'

const IRA_URL = 'http://localhost:8085/lms/api';

class ItemService {

    static getItems()
    {
        return axios.get(IRA_URL);
    }

    static addItem(item)
    {
        return axios.post(IRA_URL, item);
    }

    static getItemById(itemId)
    {
        return axios.get(IRA_URL+'/'+itemId);
    }

    static updateItem(item, itemId)
    {
        return axios.put(IRA_URL+'/'+itemId, item);
    }

    static deleteItem(itemId)
    {
        return axios.delete(IRA_URL+'/'+itemId);
    }
}

export default ItemService