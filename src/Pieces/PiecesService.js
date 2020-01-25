import CONNECT from './../config.js';
const Axios = require('axios');
const token = { headers: { Authorization: "Bearer " + sessionStorage.getItem("Token") } };

export const getPieces = async () => {

    const response = Axios.get(`${CONNECT}/Piece`, token).then(res => {
        return res.data.result;
    });
    return response;
}

export const getPiece = async (id) => {

    const response = Axios.get(`${CONNECT}/Piece/${id}`, token).then(res => {
        return res.data.result[0];
    });

    return response;
}

export const postPiece = async (data) => {
    Axios.post(`${CONNECT}/Piece/register/`, data, token);
}

export const putPiece = async (id, data) => {
    Axios.put(`${CONNECT}/Piece/${id}`, data, token);
}

export const deletePiece = async (id) => {
    Axios.delete(`${CONNECT}/Piece/${id}`, token);
}
