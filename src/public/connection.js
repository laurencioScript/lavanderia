// import Axios from "axios";
const Axios = require('axios');

const url = 'http://localhost:3000/';
const token = {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}};

// LOGIN/USERS
const getLogin = async (data) =>{
    var response = Axios.post(url + 'login', data).then(res => {
        return res.data.result;
    }).catch(e =>{
        console.log(e)
    })
    return response
}
const getUsers = async () =>{
    const response = Axios.get(url + 'user', token).then(res =>{
        return res.data.result;
    });
    return response;
}
const getUser = async (id) =>{
    const response = Axios.get(url + 'user/' + id, token).then(res =>{
        return res.data.result[0];
    });
    return response;
}
const postUser = async (data) =>{
    Axios.post(url + 'user/register/', data, token);
}
const putUser = async (id, data) =>{
    Axios.put(url + 'user/' + id, data, token);
}
const deleteUser = async (id) =>{
    Axios.delete(url + 'user/' + id, token);
}


//COLORS
const getColors = async () =>{
    const response = Axios.get(url + 'color', token).then(res =>{
        return res.data.result;
    });
    return response;
}
const getColor = async (id) =>{
    const response = Axios.get(url + 'color/' + id, token).then(res =>{
        return res.data.result[0];
    });
    return response;
}
const postColor = async (data) =>{
    Axios.post(url + 'color/register/', data, token);
}
const putColor = async (id, data) =>{
    Axios.put(url + 'color/' + id, data, token);
}
const deleteColor = async (id) =>{
    Axios.delete(url + 'color/' + id, token);
}

//CHARACTERISTICS
const getCharacteristics = async () =>{
    const response = Axios.get(url + 'characteristic', token).then(res =>{
        return res.data.result;
    });
    return response;
}
const getCharacteristic = async (id) =>{
    const response = Axios.get(url + 'characteristic/' + id, token).then(res =>{
        return res.data.result[0];
    });
    return response;
}
const postCharacteristic = async (data) =>{
    Axios.post(url + 'characteristic/register/', data, token);
}
const putCharacteristic = async (id, data) =>{
    Axios.put(url + 'characteristic/' + id, data, token);
}
const deleteCharacteristic = async (id) =>{
    Axios.delete(url + 'characteristic/' + id, token);
}


//DEFECTS
const getDefects = async () =>{
    const response = Axios.get(url + 'Defect', token).then(res =>{
        return res.data.result;
    });
    return response;
}
const getDefect = async (id) =>{
    const response = Axios.get(url + 'Defect/' + id, token).then(res =>{
        return res.data.result[0];
    });
    return response;
}
const postDefect = async (data) =>{
    Axios.post(url + 'Defect/register/', data, token);
}
const putDefect = async (id, data) =>{
    Axios.put(url + 'Defect/' + id, data, token);
}
const deleteDefect = async (id) =>{
    Axios.delete(url + 'Defect/' + id, token);
}


//Unitys
const getUnitys = async () =>{
    const response = Axios.get(url + 'Unity', token).then(res =>{
        return res.data.result;
    });
    return response;
}
const getUnity = async (id) =>{
    const response = Axios.get(url + 'Unity/' + id, token).then(res =>{
        return res.data.result[0];
    });
    return response;
}
const postUnity = async (data) =>{
    Axios.post(url + 'Unity/register/', data, token);
}
const putUnity = async (id, data) =>{
    Axios.put(url + 'Unity/' + id, data, token);
}
const deleteUnity = async (id) =>{
    Axios.delete(url + 'Unity/' + id, token);
}


//PIECES
const getPieces = async () =>{
    const response = Axios.get(url + 'Piece', token).then(res =>{
        return res.data.result;
    });
    return response;
}
const getPiece = async (id) =>{
    const response = Axios.get(url + 'Piece/' + id, token).then(res =>{
        return res.data.result[0];
    });
    return response;
}
const postPiece = async (data) =>{
    Axios.post(url + 'Piece/register/', data, token);
}
const putPiece = async (id, data) =>{
    Axios.put(url + 'Piece/' + id, data, token);
}
const deletePiece = async (id) =>{
    Axios.delete(url + 'Piece/' + id, token);
}






//CUSTOMERS
const getCustomers = async () =>{
    const response = Axios.get(url + 'Client', token).then(res =>{
        return res.data.result;
    });
    return response;
}
const getCustomer = async (id) =>{
    const response = Axios.get(url + 'Client/' + id, token).then(res =>{
        return res.data.result[0];
    });
    return response;
}
const postCustomer = async (data) =>{
    Axios.post(url + 'Client/register/', data, token)    
        .catch(res => {console.log(res.response.data); console.log(res)});
}
const putCustomer = async (id, data) =>{
    Axios.put(url + 'Client/' + id, data, token);
}
const deleteCustomer = (id) =>{
    Axios.delete(url + 'Client/' + id, token);
}



module.exports = {
    getLogin,getUser,getUsers,postUser,putUser,deleteUser, 
    getColors,getColor,postColor,putColor,deleteColor,
    getCharacteristics,getCharacteristic,postCharacteristic,putCharacteristic,deleteCharacteristic,
    getDefects,getDefect,postDefect,putDefect,deleteDefect,
    getUnitys,getUnity,postUnity,putUnity,deleteUnity,
    getPieces,getPiece,postPiece,putPiece,deletePiece,
    getCustomers,getCustomer,postCustomer,putCustomer,deleteCustomer,
};