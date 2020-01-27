import bcrypt from 'bcryptjs';

export const localAuthentication = async (level_required) =>{

    const levelCrypt = sessionStorage.getItem("level") || null;
    const token = sessionStorage.getItem("token") || null;
    
    if(!levelCrypt)
        return
    
    let existLevel = await bcrypt.compare(levelCrypt, token+3) || null;
    existLevel = await bcrypt.compare(levelCrypt, token+2) || existLevel;
    existLevel = await bcrypt.compare(levelCrypt, token+1)  || existLevel;
    
    return existLevel && existLevel <= level_required ? true : false ;
    
};