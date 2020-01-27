//import Axios from 'axios';
import CONNECT from './../config.js';
const Axios = require('axios');
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}};


export const getUsers = async () =>{
    const response = Axios.get(`${CONNECT}/user`, token).then(res =>{
        return res.data.result;
    });
    return response;
}

export const getUser = async (id) =>{
    const response = Axios.get(`${CONNECT}/user/${id}`, token).then(res =>{
        return res.data.result[0];
    });
    return response;
}

export const postUser = async (data) =>{
    Axios.post(`${CONNECT}/user/register`, data, token);
}

export const putUser = async (id, data) =>{
    Axios.put(`${CONNECT}/user/${id}`, data, token);
}

export const deleteUser = async (id) =>{
    Axios.delete(`${CONNECT}/user/${id}`, token);
}