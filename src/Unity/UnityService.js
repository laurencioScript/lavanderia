import CONNECT from './../config.js';
const Axios = require('axios');
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}};

export const getUnitys = async () =>{
    console.log(`${CONNECT}/unity`);
    
    const response = Axios.get(`${CONNECT}/unity/`, token).then(res =>{
        return res.data.result;
    });
    return response;
}

export const getUnity = async (id) =>{
    const response = Axios.get(`${CONNECT}/unity/${id}`, token).then(res =>{
        return res.data.result[0];
    });
    return response;
}

export const postUnity = async (data) =>{
    Axios.post(`${CONNECT}/unity/register/`, data, token);
}

export const putUnity = async (id, data) =>{
    Axios.put(`${CONNECT}/unity/${id}`, data, token);
}

export const deleteUnity = async (id) =>{
    Axios.delete(`${CONNECT}/unity/${id}`, token);
}