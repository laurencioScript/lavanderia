export const localAuthentication =  (level_required) =>{

    const existLevel = sessionStorage.getItem("level") || null;
    const token = sessionStorage.getItem("token") || null;
    
    return existLevel && existLevel <= level_required ? true : false ;
    
};