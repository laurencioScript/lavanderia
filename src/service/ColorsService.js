import CONNECT from './../config.js';
const Axios = require('axios');
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("token")}};
let ColorsService = {};

const getColors = async () =>{
    const response = Axios.get(CONNECT + '/color', token).then(res =>{
        return res.data.result;
    });
    
    return response;
}

const getColor = async (id) =>{
    const response = Axios.get(CONNECT + '/color/' + id, token).then(res =>{
        return res.data.result[0];
    });
    return response;
}

const postColor = async (data) =>{
    Axios.post(CONNECT + '/color/register/', data, token);
}

const putColor = async (id, data) =>{
    Axios.put(CONNECT + '/color/' + id, data, token);
}

const deleteColor = async (id) =>{
    Axios.delete(CONNECT + '/color/' + id, token);
}

export default ColorsService = {
    getColor,
    getColors,
    putColor,
    postColor,
    deleteColor
}