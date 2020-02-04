import React, { Component } from 'react';
import Header from '../../public/header';
import { Link } from 'react-router-dom';
import Bolinha from '../../public/bolinha';
import Cor from '../Create/Cor';

import './read.css';

const Connection = require('../../public/connection');

class index extends Component{
    state = {
        Clientes: []
    }

    componentDidMount(){
        Connection.getCustomer(sessionStorage.getItem('Selecionado')).then(res =>{
            this.setState({Clientes: res});

            this._setColor();
        })
    }

    _setColor = () =>{
        this.Cor.setColor(this.state.Clientes.observation_color);
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
                            onClick={() => {sessionStorage.setItem("Selecionado", this.state.Clientes.id_client); this.props.history.push('/update')}}
                        >Editar</button>

                        <button 
                            id="btn-create" 
                            onClick={() =>{ this.props.history.push('/clientes')}}
                        >Listar</button>
                        
                        <button 
                            id="btn-delete" 
                            onClick={() => {
                                Connection.deleteCustomer(sessionStorage.getItem("Selecionado")).then(this.props.history.push('/Clientes'));}}
                        >Excluir</button>
                    </div>
                </div>

                <div id="customer-container">
                    <div id="customer-content">
                        <div id="first-line">
                            <div id="name">
                                <p className="title">Nome</p>
                                <p>{this.state.Clientes.name_client}</p>
                            </div>
                            <div id="corporateName">
                                <p className="title">Razão Social</p>
                                <p>{this.state.Clientes.corporate_name}</p>
                            </div>
                            <div id="CNPJ">
                                <p className="title">CNPJ</p>
                                <p>{this.state.Clientes.corporate_name == '' ? '' : this.state.Clientes.cpf_cnpj}</p>
                            </div>
                        </div>
                        
                        <div id="secondLine">
                            <div id="CPF">
                                <p className="title">CPF</p>
                                <p>{this.state.Clientes.corporate_name != '' ? '' : this.state.Clientes.cpf_cnpj}</p>
                            </div>

                            <div id="publicPlace">
                                <p className="title">Logradouro</p>
                                <p>{this.state.Clientes.address_client}</p>
                            </div>

                            <div id="number">
                                <p className="title">Número</p>
                                <p>{this.state.Clientes.phone_number}</p>
                            </div>
                            <div id="complement">
                                <p className="title">Complemento</p>
                                <p>{this.state.Clientes.complement}</p>
                            </div>
                        </div>
                        
                        <div id="third-line">
                            <div id="neighborhood">
                                <p className="title">Bairro</p>
                                <p>{this.state.Clientes.neighborhood}</p>
                            </div>

                            <div id="city">
                                <p className="title">Cidade</p>
                                <p>{this.state.Clientes.city}</p>
                            </div>

                            <div id="state">
                                <p className="title">Estado</p>
                                <p>{this.state.Clientes.state_city}</p>
                            </div>

                            <div id="eMail">
                                <p className="title">E-mail</p>
                                <p>{this.state.Clientes.email}</p>
                            </div>
                        </div>
                        
                        <div id="fourthy-line">
                            <div id="phone">
                                <p className="title">Telefone</p>
                                <p>{this.state.Clientes.contact}</p>                            
                            </div>

                            <div id="cellphone">
                                <p className="title">Celular</p>
                                <p>{this.state.Clientes.contact}</p>
                            </div>

                            <div id="note">
                                <p className="title">Observação</p>
                                <p>{this.state.Clientes.observation_description}</p>
                            </div>

                            <div id="color">
                                <p className="title">Cor</p>
                                <Cor ref={(component) => { this.Cor = component}} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default index;