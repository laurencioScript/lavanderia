import CONNECT from './../config.js';
const Axios = require('axios');
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("token")}};

export const getDefects = async () =>{
    const response = Axios.get(`${CONNECT}/Defect`, token).then(res =>{
        return res.data.result;
    });
    return response;
}

export const getDefect = async (id) =>{
    const response = Axios.get(`${CONNECT}/Defect/${id}` , token).then(res =>{
        return res.data.result[0];
    });
    return response;
}

export const postDefect = async (data) =>{
    Axios.post(`${CONNECT}/Defect/register/`, data, token);
}

export const putDefect = async (id, data) =>{
    Axios.put(`${CONNECT}/Defect/${id}`, data, token);
}

export const deleteDefect = async (id) =>{
    Axios.delete(`${CONNECT}/Defect/${id}`, token);
}