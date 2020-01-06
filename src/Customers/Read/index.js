import React, { Component } from 'react';
import Header from '../../public/header';
import { Link, Redirect } from 'react-router-dom';

import Axios from 'axios';

import './read.css';

class index extends Component{
    state = {
        Clientes: []
    }

    componentDidMount(){
        Axios.get("http://localhost:3000/client/" + sessionStorage.getItem('Selecionado'), {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}}).then(res =>{
            this.setState({Clientes: res.data.result[0]});

            // sessionStorage.removeItem("Selecionado");
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
                        <Link to='/update' >
                            <button 
                                id="btn-edit" 
                                onClick={() => {sessionStorage.setItem("Selecionado", this.state.Clientes.id_client)}}
                            >Editar</button>
                        </Link>

                        <Link to='/clientes' >
                            <button 
                                id="btn-create" 
                            >Listar</button>
                        </Link>
                        
                        <button 
                            id="btn-delete" 
                            onClick={() => {
                                Axios.delete('http://localhost:3000/client/' + sessionStorage.getItem("Selecionado"), {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}}).then(this.props.history.push('/Clientes'));}}
                        >Excluir</button>
                    </div>
                </div>

                <div id="customer-container">
                    <div id="customer-content">
                        <div id="first-line">
                            <div id="name">
                                <p class="title">Nome</p>
                                <p>{this.state.Clientes.name_client}</p>
                            </div>
                            <div id="corporateName">
                                <p class="title">Razão Social</p>
                                <p>{this.state.Clientes.corporate_name}</p>
                            </div>
                            <div id="CNPJ">
                                <p class="title">CNPJ</p>
                                <p>{this.state.Clientes.corporate_name == '' ? '' : this.state.Clientes.cpf_cnpj}</p>
                            </div>
                        </div>
                        
                        <div id="secondLine">
                            <div id="CPF">
                                <p class="title">CPF</p>
                                <p>{this.state.Clientes.corporate_name != '' ? '' : this.state.Clientes.cpf_cnpj}</p>
                            </div>

                            <div id="publicPlace">
                                <p class="title">Logradouro</p>
                                <p>{this.state.Clientes.address_client}</p>
                            </div>

                            <div id="number">
                                <p class="title">Número</p>
                                <p>{this.state.Clientes.phone_number}</p>
                            </div>
                            <div id="complement">
                                <p class="title">Complemento</p>
                                <p>{this.state.Clientes.complement}</p>
                            </div>
                        </div>
                        
                        <div id="third-line">
                            <div id="neighborhood">
                                <p class="title">Bairro</p>
                                <p>{this.state.Clientes.neighborhood}</p>
                            </div>

                            <div id="city">
                                <p class="title">Cidade</p>
                                <p>{this.state.Clientes.city}</p>
                            </div>

                            <div id="state">
                                <p class="title">Estado</p>
                                <p>{this.state.Clientes.state_city}</p>
                            </div>

                            <div id="eMail">
                                <p class="title">E-mail</p>
                                <p>{this.state.Clientes.email}</p>
                            </div>
                        </div>
                        
                        <div id="fourthy-line">
                            <div id="phone">
                                <p class="title">Telefone</p>
                                <p>{this.state.Clientes.contact}</p>                            
                            </div>

                            <div id="cellphone">
                                <p class="title">Celular</p>
                                <p>{this.state.Clientes.contact}</p>
                            </div>

                            <div id="note">
                                <p class="title">Observação</p>
                                <p>{this.state.Clientes.observation_description}</p>
                            </div>

                            <div id="color">
                                <p class="title">Cor</p>
                                <p>{this.state.Clientes.observation_color}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default index;