//import Axios from 'axios';
import CONNECT from './../../config.js';
const Axios = require('axios');
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}};

export default getLogin = async (data) =>{
    var response = Axios.post(url + 'login', data).then(res => {
        return res.data.result;
    }).catch(e =>{
        console.log(e)
    })
    return response
}

export default getUsers = async () =>{
    const response = Axios.get(url + 'user', token).then(res =>{
        return res.data.result;
    });
    return response;
}

export default getUser = async (id) =>{
    const response = Axios.get(url + 'user/' + id, token).then(res =>{
        return res.data.result[0];
    });
    return response;
}

export default postUser = async (data) =>{
    Axios.post(url + 'user/register/', data, token);
}

export default putUser = async (id, data) =>{
    Axios.put(url + 'user/' + id, data, token);
}

export default deleteUser = async (id) =>{
    Axios.delete(url + 'user/' + id, token);
}