import CONNECT from './../config.js';
const Axios = require('axios');
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("token")}};


export const getColors = async () =>{
    const response = Axios.get(`${CONNECT}/color`, token).then(res =>{
        return res.data.result;
    });
    return response;
}

export const getColor = async (id) =>{
    const response = Axios.get(`${CONNECT}/color/${id}`, token).then(res =>{
        return res.data.result[0];
    });
    return response;
}

export const postColor = async (data) =>{
    Axios.post(`${CONNECT}/color/register/`, data, token);
}

export const putColor = async (id, data) =>{
    Axios.put(`${CONNECT}/color/${id}`, data, token);
}

export const deleteColor = async (id) =>{
    Axios.delete(`${CONNECT}/color/${id}`, token);
}