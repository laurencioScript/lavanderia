import CONNECT from './../../config.js';
const Axios = require('axios');
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}};

export default getDefects = async () =>{
    const response = Axios.get(url + 'Defect', token).then(res =>{
        return res.data.result;
    });
    return response;
}

export default getDefect = async (id) =>{
    const response = Axios.get(url + 'Defect/' + id, token).then(res =>{
        return res.data.result[0];
    });
    return response;
}

export default postDefect = async (data) =>{
    Axios.post(url + 'Defect/register/', data, token);
}

export default putDefect = async (id, data) =>{
    Axios.put(url + 'Defect/' + id, data, token);
}

export default deleteDefect = async (id) =>{
    Axios.delete(url + 'Defect/' + id, token);
}