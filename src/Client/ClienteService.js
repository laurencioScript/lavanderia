import CONNECT from './../../config.js';
const Axios = require('axios');
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}};

export default getCustomers = async () =>{
    const response = Axios.get(url + 'Client', token).then(res =>{
        return res.data.result;
    });
    return response;
}

export default getCustomer = async (id) =>{
    const response = Axios.get(url + 'Client/' + id, token).then(res =>{
        return res.data.result[0];
    });
    return response;
}

export default postCustomer = async (data) =>{
    Axios.post(url + 'Client/register/', data, token)    
        .catch(res => {console.log(res.response.data); console.log(res)});
}

export default putCustomer = async (id, data) =>{
    Axios.put(url + 'Client/' + id, data, token);
}

export default deleteCustomer = (id) =>{
    Axios.delete(url + 'Client/' + id, token);
}
