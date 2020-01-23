export const localAuthentication = () =>{
    var retorno = false;
    
    retorno = sessionStorage.getItem("email") == null ? false : true;
    console.log(retorno);

    return retorno;
};