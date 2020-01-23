import CONNECT from './../../config.js';
const Axios = require('axios');
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}};

export default getCharacteristics = async () =>{
    const response = Axios.get(url + 'characteristic', token).then(res =>{
        return res.data.result;
    });
    return response;
}

export default getCharacteristic = async (id) =>{
    const response = Axios.get(url + 'characteristic/' + id, token).then(res =>{
        return res.data.result[0];
    });
    return response;
}

export default postCharacteristic = async (data) =>{
    Axios.post(url + 'characteristic/register/', data, token);
}

export default putCharacteristic = async (id, data) =>{
    Axios.put(url + 'characteristic/' + id, data, token);
}

export default deleteCharacteristic = async (id) =>{
    Axios.delete(url + 'characteristic/' + id, token);
}