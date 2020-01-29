//import Axios from 'axios';
import CONNECT from './../config';
import bcrypt from 'bcryptjs';
const Axios = require('axios');
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("token")}};

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
        
        const result =  response.data.result;

        let cargo;
        
        cargo = result && result.level_user == 1 ? "Mestre" : cargo;
        cargo = result && result.level_user == 2 ? "Administrador" : cargo;
        cargo = result && result.level_user == 3 ? "Atendente" : cargo;

        sessionStorage.setItem("user",JSON.stringify({
            nome:result.name_user,
            cargo:cargo,
        }) );

        sessionStorage.setItem("token", result.token);
        //const level = await bcrypt.hash( result.token+result.level_user, 10);
        sessionStorage.setItem("level", result.level_user);
        
    } catch (error) {
        const { response } = error;
        console.log(response.status);
    }

   
}

 