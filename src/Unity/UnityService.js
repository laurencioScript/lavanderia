import CONNECT from './../config.js';
const Axios = require('axios');
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}};

export const getUnitys = async () =>{
    const response = Axios.get(`${CONNECT}/Unity`, token).then(res =>{
        return res.data.result;
    });
    return response;
}

export const getUnity = async (id) =>{
    const response = Axios.get(`${CONNECT}/Unity/${id}`, token).then(res =>{
        return res.data.result[0];
    });
    return response;
}

export const postUnity = async (data) =>{
    Axios.post(`${CONNECT}/Unity/register/`, data, token);
}

export const putUnity = async (id, data) =>{
    Axios.put(`${CONNECT}/Unity/${id}`, data, token);
}

export const deleteUnity = async (id) =>{
    Axios.delete(`${CONNECT}/Unity/${id}`, token);
}