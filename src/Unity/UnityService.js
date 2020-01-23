import CONNECT from './../../config.js';
const Axios = require('axios');
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}};

export default getUnitys = async () =>{
    const response = Axios.get(url + 'Unity', token).then(res =>{
        return res.data.result;
    });
    return response;
}

export default getUnity = async (id) =>{
    const response = Axios.get(url + 'Unity/' + id, token).then(res =>{
        return res.data.result[0];
    });
    return response;
}

export default postUnity = async (data) =>{
    Axios.post(url + 'Unity/register/', data, token);
}

export default putUnity = async (id, data) =>{
    Axios.put(url + 'Unity/' + id, data, token);
}

export default deleteUnity = async (id) =>{
    Axios.delete(url + 'Unity/' + id, token);
}