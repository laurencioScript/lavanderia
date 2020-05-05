import CONNECT from './../config';
const Axios = require('axios');
let SerOrdService;

const buscarVendas = async (filter) =>{    
    try {
        const token = {headers: {Authorization: "Bearer " + sessionStorage.getItem("token")}};
        
        const response = await Axios.get(`${CONNECT}/service`, token)
        
        return response.data.result;
        
    } catch (e) {
        console.log(e);
        
    }

   
}

export default SerOrdService = {
    buscarVendas
}


