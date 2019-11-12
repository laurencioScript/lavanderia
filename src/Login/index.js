import React from 'react';
import './index.css';
import img_placeholder from "../public/placeholder-img.jpg";
import {withRouter} from 'react-router-dom';
import axios from '../../node_modules/axios';

class Index extends React.Component{
    state = {
        serverMessage: "",
        login: "",
        senha: ""
    }

    submitLogin = async (e) =>{
        e.preventDefault();

        const url = 'http://localhost:3000/login';
        await axios.post(url, {
                email: this.state.login,
                senha: this.state.senha
        }).then(function(response){
            console.log(response.data);
            var nivel = 0;
            switch(response.data.nivel){
                case 1: {nivel = "Atendente"; break;}
                case 2: {nivel = "Administrador"; break;}
                case 3: {nivel = "Mestre"; break;}
            };
            sessionStorage.setItem("Nome", response.data.nome);
            sessionStorage.setItem("E-mail", response.data.email);
            sessionStorage.setItem("Nivel", nivel);
        });
        
        this.props.history.push('/Menu');
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
                        <img src={img_placeholder} alt=""/>
                    </div>

                    <div id="form-login">
                        <form onSubmit={this.submitLogin} >       
                            {/* */}
                            <div>
                                <img src={img_placeholder} alt=" "/>
                                <input 
                                    id="input-login"
                                    type="text" 
                                    placeholder="Usuário"
                                    onChange={this.inputChange}/>
                            </div>

                            <div>
                                <img src={img_placeholder} alt=" "/>
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