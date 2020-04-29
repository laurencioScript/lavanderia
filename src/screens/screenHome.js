import React, { useState, useEffect } from 'react';
import { Link, Redirect, useHistory  } from "react-router-dom";
import { render } from 'react-dom';

import './screenHome.css';
import logo from './../public/icons/logo.png';
import icon_user from './../public/icons/user.svg';
import icon_password from './../public/icons/lock.svg';

import HomeService from './../service/HomeService';

function Index() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const login = async (e) => {

        e.preventDefault();
        
        if (!email || !password) setMessage("Preencha o(s) campo(s) Usuário e/ou Senha!!");
        else{

            const result = await HomeService.login({ email, password });

            if (!result || result === 404) setMessage("Usuário ou Senha incorreto(s) ou inexistente !!");
            else{
                let cargo;
                
                cargo = result && result.level_user === 1 ? "Mestre" : cargo;
                cargo = result && result.level_user === 2 ? "Administrador" : cargo;
                cargo = result && result.level_user === 3 ? "Atendente" : cargo;

                sessionStorage.setItem("user",JSON.stringify({
                    nome:result.name_user,
                    cargo:cargo,
                }) );
                sessionStorage.setItem("token", result.token);
                sessionStorage.setItem("level", result.level_user);

                history.push("/Menu");
            }
        }
        
    }

    const verificaSeEstaLogado = ()=>{
        if(sessionStorage.getItem("token"))
            history.push("/Menu");
    }

    verificaSeEstaLogado()

    return (
        <div id="login">

            <div id="logo-login">
                <img src={logo} alt="Bubble System Logo" />
            </div>

            <div id="form-login">
                <h1>Entrar no Bubble</h1>
                <h1>System</h1>

                <form>

                    <div>
                        <img src={icon_user} id="icon_user" alt=" " />
                        <input
                            id="input-login"
                            type="text"
                            placeholder="Usuário"
                            onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <img src={icon_password} id="icon_locker" alt=" " />
                        <input
                            id="input-senha"
                            type="password"
                            placeholder="Senha"
                            onChange={e => setPassword(e.target.value)} />
                    </div>

                    <Link to="/Menu" id="btn-login" onClick={e => login(e)}>Entrar</Link>

                <p id="login-message">{message}</p>
                    
                </form>
            </div>
        </div>
    );

}

export default Index;