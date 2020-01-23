import CONNECT from './../../config.js';
const Axios = require('axios');
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}};

export default getPieces = async () =>{
    const response = Axios.get(url + 'Piece', token).then(res =>{
        return res.data.result;
    });
    return response;
}

export default getPiece = async (id) =>{
    const response = Axios.get(url + 'Piece/' + id, token).then(res =>{
        return res.data.result[0];
    });
    return response;
}

export default postPiece = async (data) =>{
    Axios.post(url + 'Piece/register/', data, token);
}

export default putPiece = async (id, data) =>{
    Axios.put(url + 'Piece/' + id, data, token);
}

export default deletePiece = async (id) =>{
    Axios.delete(url + 'Piece/' + id, token);
}
