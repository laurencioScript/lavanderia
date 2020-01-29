import CONNECT from './../config';
import bcrypt from 'bcryptjs';
const Axios = require('axios');
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("token")}};

export const buscarVendas = async (filter) =>{
    
    try {
        
        const response = await Axios.get(`${CONNECT}/service/`, token)
        
        return response.data.result;
        
    } catch (error) {
        console.log(error);
        
    }

   
}
