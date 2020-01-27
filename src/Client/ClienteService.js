import CONNECT from './../config.js';
const Axios = require('axios');
const token = { headers: { Authorization: "Bearer " + sessionStorage.getItem("Token") } };

export const getCustomers = async () => {
    const response = Axios.get(`${CONNECT}/Client`, token).then(res => {
        return res.data.result;
    });
    return response;
}

export const getCustomer = async (id) => {
    const response = Axios.get(`${CONNECT}/Client/${id}`, token).then(res => {
        return res.data.result[0];
    });
    return response;
}

export const postCustomer = async (data) => {
    Axios.post(`${CONNECT}/Client/register/`, data, token)
        .catch(res => { console.log(res.response.data); console.log(res) });
}

export const putCustomer = async (id, data) => {
    Axios.put(`${CONNECT}/Client/${id}`, data, token);
}

export const deleteCustomer = (id) => {
    Axios.delete(`${CONNECT}/Client/${id}`, token);
}
