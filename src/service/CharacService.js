import CONNECT from './../config.js';
const Axios = require('axios');
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("token")}};
let CharacService = {}

const getCharacteristics = async () =>{
    const response = Axios.get(CONNECT + '/characteristic', token).then(res =>{
        return res.data.result;
    });
    return response;
}

const getCharacteristic = async (id) =>{
    const response = Axios.get(CONNECT + 'characteristic/' + id, token).then(res =>{
        return res.data.result[0];
    });
    return response;
}

const postCharacteristic = async (data) =>{
    Axios.post(CONNECT + 'characteristic/register/', data, token);
}

const putCharacteristic = async (id, data) =>{
    Axios.put(CONNECT + 'characteristic/' + id, data, token);
}

const deleteCharacteristic = async (id) =>{
    Axios.delete(CONNECT + 'characteristic/' + id, token);
}

export default CharacService = {
    getCharacteristic,
    getCharacteristics,
    postCharacteristic,
    putCharacteristic,
    deleteCharacteristic
}