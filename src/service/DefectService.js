import CONNECT from './../config.js';
const Axios = require('axios');
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("token")}};
let defectService = {};

const getDefects = async () =>{
    const response = await Axios.get(`${CONNECT}/Defect`, token);    
    return response.data.result;
}

const getDefect = async (id) =>{
    const response = await Axios.get(`${CONNECT}/Defect/${id}`, token)
    return response.data.result[0];
}

const postDefect = async (data) =>{
    const response = await Axios.post(`${CONNECT}/Defect/register`, data, token);
    return response.data.result;
}

const putDefect = async (id, data) =>{
    const response = await Axios.put(`${CONNECT}/Defect/${id}`, data, token);
    return response.data.result;
}

const deleteDefect = async (id) =>{
    const response = await Axios.delete(`${CONNECT}/Defect/${id}`, token);
    return response.data.result;
}

export default defectService = {
    getDefect,
    getDefects,
    putDefect,
    postDefect,
    deleteDefect
}