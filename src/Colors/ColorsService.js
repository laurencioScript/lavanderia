import CONNECT from './../../config.js';
const Axios = require('axios');
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}};


export default getColors = async () =>{
    const response = Axios.get(url + 'color', token).then(res =>{
        return res.data.result;
    });
    return response;
}

export default getColor = async (id) =>{
    const response = Axios.get(url + 'color/' + id, token).then(res =>{
        return res.data.result[0];
    });
    return response;
}

export default postColor = async (data) =>{
    Axios.post(url + 'color/register/', data, token);
}

export default putColor = async (id, data) =>{
    Axios.put(url + 'color/' + id, data, token);
}

export default deleteColor = async (id) =>{
    Axios.delete(url + 'color/' + id, token);
}