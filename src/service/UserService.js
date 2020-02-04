//import Axios from 'axios';
import CONNECT from './../config.js';
const Axios = require('axios');
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("token")}};
let UserService = {}

const getUsers = async () =>{
    const response = Axios.get(`${CONNECT}/user`, token).then(res =>{
        return res.data.result;
    });
    return response;
}

const getUser = async (id) =>{
    const response = Axios.get(`${CONNECT}/user/${id}`, token).then(res =>{
        return res.data.result[0];
    });
    return response;
}

const createUser = async (data) =>{
    Axios.post(`${CONNECT}/user/register`, data, token);
}

const updateUser = async (id, data) =>{
    Axios.put(`${CONNECT}/user/${id}`, data, token);
}

const deleteUser = async (id) =>{
    Axios.delete(`${CONNECT}/user/${id}`, token);
}

export default UserService = {
    getUser,
    getUsers,
    createUser,
    deleteUser,
    updateUser
}