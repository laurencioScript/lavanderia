import CONNECT from './../config.js';
const Axios = require('axios');
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("token")}};

let UnityService = {};

const getUnitys = async () =>{
    const response = await Axios.get(`${CONNECT}/unity`, token);    
    return response.data.result;
}

const getUnity = async (id) =>{
    const response = await Axios.get(`${CONNECT}/Unity/${id}`, token)
    return response.data.result[0];
}

const postUnity = async (data) =>{
    const response = await Axios.post(`${CONNECT}/Unity/register`, data, token);
    return response.data.result;
}

const putUnity = async (id, data) =>{
    const response = await Axios.put(`${CONNECT}/Unity/${id}`, data, token);
    return response.data.result;
}

const deleteUnity = async (id) =>{
    const response = await Axios.delete(`${CONNECT}/Unity/${id}`, token);
    return response.data.result;
}

export default UnityService = {
    getUnity,
    getUnitys,
    putUnity,
    postUnity,
    deleteUnity
}