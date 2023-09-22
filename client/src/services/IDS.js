import axios from 'axios'

const IRA_URL = 'http://localhost:8085/lms/api';

class ItemService {

    static getItems()
    {
        return axios.get(IRA_URL+'/getItem');
    }

    static addItem(item)
    {
        return axios.post(IRA_URL+'/addItem', item);
    }

    static getItemById(itemId)
    {
        return axios.get(IRA_URL+'/getItem/'+itemId);
    }

    static updateItem(item, itemId)
    {
        return axios.put(IRA_URL+'/addItem/'+itemId, item);
    }

    static deleteItem(itemId)
    {
        return axios.delete(IRA_URL+'/deleteItem/'+itemId);
    }
}

export default ItemService