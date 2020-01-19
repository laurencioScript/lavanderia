import React from 'react';
import './index.css';

import icon_maquina from '../public/icons/icon_maquina.png';
import icon_user from '../public/icons/icon_user.png';
import icon_password from '../public/icons/icon_password.png';

const Connection = require('../public/connection');


class Index extends React.Component{
    state = {
        Message: "",
        login: "",
        senha: ""
    }

    submitLogin = async (e) =>{
        e.preventDefault();
        var data = {
            email: this.state.login,
            password: this.state.senha
        };

        Connection.getLogin(data).then(response =>{
            console.log(response);
            var nivel = null;
            switch(response.level_user){
                case 1: {nivel = "Mestre"; break;}
                case 2: {nivel = "Administrador"; break;}
                case 3: {nivel = "Atendente"; break;}
            };
            sessionStorage.clear();
            sessionStorage.setItem("nome", response.name_user);
            sessionStorage.setItem("email", response.email);
            sessionStorage.setItem("nivel", nivel);
            sessionStorage.setItem("id", response.id_user);
            sessionStorage.setItem("Token", response.token);
            this.props.history.push('/Menu');
        });
}
    
    inputChange = () => {
        this.setState({ login: document.querySelector("#input-login").value,
                        senha: document.querySelector("#input-senha").value});
    }

    render(){
        sessionStorage.clear();
        return(
            <div id="login">
                <div id="container">
                    <div id="logo-login">
                        <img src={icon_maquina} alt=""/>
                    </div>

                    <p>{this.state.Message}</p>

                    <div id="form-login">
                        <form onSubmit={this.submitLogin} >  
                            <div>
                                <img src={icon_user} alt=" "/>
                                <input 
                                    id="input-login"
                                    type="text" 
                                    placeholder="Usuário"
                                    onChange={this.inputChange}/>
                            </div>

                            <div>
                                <img src={icon_password} alt=" "/>
                                <input 
                                    id="input-senha"
                                    type="password" 
                                    placeholder="Senha"
                                    onChange={this.inputChange} />
                            </div>
                            
                            <button type="submit" id="btn-login">ENTRAR</button>
                        </form>                
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;