import CONNECT from './../config.js';
const Axios = require('axios');
const token = { headers: { Authorization: "Bearer " + sessionStorage.getItem("token") } };
let ClienteService = {};

const getCustomers = async () => {
    const response = Axios.get(`${CONNECT}/Client`, token).then(res => {
        return res.data.result;
    });
    return response;
}

const getCustomer = async (id) => {
    const response = Axios.get(`${CONNECT}/Client/${id}`, token).then(res => {
        return res.data.result[0];
    });
    return response;
}

const postCustomer = async (data) => {
    Axios.post(`${CONNECT}/Client/register/`, data, token)
        .catch(res => { console.log(res.response.data); console.log(res) });
}

const putCustomer = async (id, data) => {
    Axios.put(`${CONNECT}/Client/${id}`, data, token);
}

const deleteCustomer = (id) => {
    Axios.delete(`${CONNECT}/Client/${id}`, token);
}


export default ClienteService = {
    getCustomer,
    getCustomers,
    postCustomer,
    putCustomer,
    deleteCustomer
}