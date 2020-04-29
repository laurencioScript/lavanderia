import CONNECT from './../config.js';
import Axios from 'axios';
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("token")}};
let CharacService = {}

const getCharacteristics = async () =>{
    let response = await Axios.get(`${CONNECT}/characteristic`, token);
    return response.data.result;
}

const getCharacteristic = async (id) =>{
    let response = await Axios.get(`${CONNECT}/characteristic/${id}`, token)
    return response.data.result[0];
}

const postCharacteristic = async (data) =>{
    let response = await Axios.post(`${CONNECT}/characteristic/register/`, data, token);
    return response.data.result;
}

const putCharacteristic = async (id, data) =>{
    let response = await Axios.put(`${CONNECT}/characteristic/${id}`, data, token);
    return response.data.result;
}

const deleteCharacteristic = async (id) =>{
    let response = await Axios.delete(`${CONNECT}/characteristic/${id}`, token);
    return response.data.result;
}

export default CharacService = {
    getCharacteristic,
    getCharacteristics,
    postCharacteristic,
    putCharacteristic,
    deleteCharacteristic
}