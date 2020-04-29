//import Axios from 'axios';
import CONNECT from './../config';
const Axios = require('axios');
let HomeService = {};

const login = async (data) =>{

    const option = {
        method: 'post',
        url: `${CONNECT}/login`,
        validateStatus: function (status) {
            return status >= 200 && status < 300; // default
        },
        data
    };
    
    try {
        const response = await Axios(option);
        
        const result =  response.data.result;

        return result;
        
    } catch (error) {
        const { response } = error;
        console.log(`Error ao fazer login`,response);
        return null
    }

   
}

export default HomeService = {
    login
}

 