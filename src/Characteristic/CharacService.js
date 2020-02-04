import CONNECT from './../config.js';
const Axios = require('axios');
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("token")}};

export const getCharacteristics = async () =>{
    const response = Axios.get(`${CONNECT}/characteristic`, token).then(res =>{
        return res.data.result;
    });
    return response;
}

export const getCharacteristic = async (id) =>{
    const response = Axios.get(`${CONNECT}/characteristic/${id}`, token).then(res =>{
        return res.data.result[0];
    });
    return response;
}

export const postCharacteristic = async (data) =>{
    Axios.post(`${CONNECT}/characteristic'/register/`, data, token);
}

export const putCharacteristic = async (id, data) =>{
    Axios.put(`${CONNECT}/characteristic/${id}`, data, token);
}

export const deleteCharacteristic = async (id) =>{
    Axios.delete(`${CONNECT}/characteristic/${id}`, token);
}