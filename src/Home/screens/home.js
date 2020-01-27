import React, { useState, useEffect } from 'react';
import './home.css';
import icon_maquina from '../../public/icons/icon_maquina.png';
import icon_user from '../../public/icons/icon_user.png';
import icon_password from '../../public/icons/icon_password.png';
import {Link} from "react-router-dom";

import {getLogin} from '../HomeService';

function Index(){
    
    const [email,setEmail ] = useState('');
    const [password , setPassword ] = useState('');
    const [message , setMessage ] = useState('');

    const login = async (e)=>{
        
        // validação de email e password
        if(!email || !password)
            return
            
        await getLogin({ email, password })
      
    }
    
    
    
    return(
        <div id="login">
            <div id="container">
                <div id="logo-login">
                    <img src={icon_maquina} alt=""/>
                </div>

                <p>{message}</p>

                <div id="form-login">
                    <form >  
                        <div>
                            <img src={icon_user} alt=" "/>
                            <input 
                                id="input-login"
                                type="text" 
                                placeholder="Usuário"
                                onChange={e => setEmail(e.target.value)}/>
                        </div>

                        <div>
                            <img src={icon_password} alt=" "/>
                            <input 
                                id="input-senha"
                                type="password" 
                                placeholder="Senha"
                                onChange={e => setPassword(e.target.value)} />
                        </div>
                        <Link to="/Menu" >
                            <button onClick={e => login(e)} id="btn-login">Fazer login</button>
                        </Link>
                    </form>                
                </div>
            </div>
        </div>
    );
    
}

export default Index;