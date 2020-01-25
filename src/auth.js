export const localAuthentication = () =>{

    return sessionStorage.getItem("email") == null ? false : true;

};