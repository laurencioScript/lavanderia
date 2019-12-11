import React, { Component } from 'react';
import Header from '../../public/header';
import { Link } from 'react-router-dom';

import Axios from 'axios';

import './read.css';

class index extends Component{
    state = {
        Clientes: []
    }

    componentDidMount(){
        Axios.get("http://loacalhost:3000/client").then(res =>{
            this.setState({Clientes: res.data.result[0]});
        })
    }

    render(){
        return(
            <>
                <Header name="Visualizar Cliente"/>

                <div id="menu-read-customer">
                    <div id="volta">
                        <Link to="/Clientes">
                            <p>↪ Voltar</p>
                        </Link>
                    </div>

                    <div id="buttons">
                        <button 
                            id="btn-edit" 
                        >Editar</button>

                        <button 
                            id="btn-create" 
                        >Listar</button>

                        <button 
                            id="btn-delete" 
                        >Excluir</button>
                    </div>
                </div>

                <div id="customer-container">
                    <div id="customer-content">
                        <div id="first-line">
                            <div id="name">
                                <p class="title">Nome</p>
                                <p>Lucas Marques de Oliveira Santos</p>
                            </div>
                            <div id="corporateName">
                                <p class="title">Razão Social</p>
                                <p></p>
                            </div>
                            <div id="CNPJ">
                                <p class="title">CNPJ</p>
                                <p></p>
                            </div>
                        </div>
                        
                        <div id="secondLine">
                            <div id="CPF">
                                <p class="title">CPF</p>
                                <p></p>
                            </div>

                            <div id="publicPlace">
                                <p class="title">Logradouro</p>
                                <p></p>
                            </div>

                            <div id="number">
                                <p class="title">Número</p>
                                <p></p>
                            </div>
                            <div id="complement">
                                <p class="title">Complemento</p>
                                <p></p>
                            </div>
                        </div>
                        
                        <div id="third-line">
                            <div id="neighborhood">
                                <p class="title">Bairro</p>
                                <p></p>
                            </div>

                            <div id="city">
                                <p class="title">Cidade</p>
                                <p></p>
                            </div>

                            <div id="state">
                                <p class="title">Estado</p>
                                <p></p>
                            </div>

                            <div id="eMail">
                                <p class="title">E-mail</p>
                                <p></p>
                            </div>
                        </div>
                        
                        <div id="fourthy-line">
                            <div id="phone">
                                <p class="title">Telefone</p>
                                <p></p>                            
                            </div>

                            <div id="cellphone">
                                <p class="title">Celular</p>
                                <p></p>
                            </div>

                            <div id="note">
                                <p class="title">Observação</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>

                            <div id="color">
                                <p class="title">Cor</p>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default index;