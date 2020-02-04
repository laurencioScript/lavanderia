import React, { useState, useEffect } from 'react';
import { Link,Redirect,useHistory  } from "react-router-dom";
import { render } from 'react-dom';

import './screenHome.css';
import icon_maquina from './../public/icons/icon_maquina.png';
import icon_user from './../public/icons/icon_user.png';
import icon_password from './../public/icons/icon_password.png';

import HomeService from './../service/HomeService';

function Index() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const login = async (e) => {
        
        e.preventDefault();
        
        // validação de email e password
        // no futuro isso vai mandar uma mensagem de erro
        if (!email || !password) return null 

        const result = await HomeService.login({ email, password });

        if (!result) return null

        let cargo;
        
        cargo = result && result.level_user == 1 ? "Mestre" : cargo;
        cargo = result && result.level_user == 2 ? "Administrador" : cargo;
        cargo = result && result.level_user == 3 ? "Atendente" : cargo;

        sessionStorage.setItem("user",JSON.stringify({
            nome:result.name_user,
            cargo:cargo,
        }) );
        sessionStorage.setItem("token", result.token);
        sessionStorage.setItem("level", result.level_user);

        history.push("/Menu");

    }

    const verificaSeEstaLogado = ()=>{
        if(sessionStorage.getItem("token"))
            history.push("/Menu");
    }

    verificaSeEstaLogado()

    return (
        <div id="login">
            <div id="container">
                <div id="logo-login">
                    <img src={icon_maquina} alt="" />
                </div>

                <p>{message}</p>

                <div id="form-login">
                    <form >
                        <div>
                            <img src={icon_user} alt=" " />
                            <input
                                id="input-login"
                                type="text"
                                placeholder="Usuário"
                                onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div>
                            <img src={icon_password} alt=" " />
                            <input
                                id="input-senha"
                                type="password"
                                placeholder="Senha"
                                onChange={e => setPassword(e.target.value)} />
                        </div>

                        <Link to="/Menu" id="btn-login" onClick={e => login(e)}> Fazer login </Link>
                        
                    </form>
                </div>
            </div>
        </div>
    );

}

export default Index;