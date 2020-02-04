import CONNECT from './../config';
const Axios = require('axios');
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("token")}};
let SerOrdService;

const buscarVendas = async (filter) =>{
    
    try {
        
        const response = await Axios.get(`${CONNECT}/service/`, token)
        
        return response.data.result;
        
    } catch (error) {
        console.log(error);
        
    }

   
}

export default SerOrdService = {
    buscarVendas
}


