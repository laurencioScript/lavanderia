//import Axios from 'axios';
import CONNECT from './../config';
const Axios = require('axios');
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}};

export const getLogin = async (data) =>{

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
        
        return response.data.result;
        
    } catch (error) {
        const { response } = error;
        console.log(response.status);
    }

   
}

 