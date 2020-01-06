import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Header from '../public/header';

import icon_user from '../public/icons/icon_user.png';
import img_placeholder from '../public/placeholder-img.jpg';

import Axios from 'axios';

import './customers.css';

class index extends Component{
    state = {
        Clientes: []
    }

    componentDidMount(){
        Axios.get("http://localhost:3000/client", {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}}).then(res =>{
            this.setState({Clientes: res.data.result});
        })
    }
    componentDidUpdate(){
        Axios.get("http://localhost:3000/client", {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}}).then(res =>{
            this.setState({Clientes: res.data.result});
        })
    }

    render(){
        return(
            <>
                <Header name="Clientes" />

                <>{/* PARTE SUPERIOR ou /de pesquisa */}
                <div id="volta">
                        <p>↪ Voltar</p>
                    </div>

                    <div id="icon-page">
                        {/* CARROUSEL */}
                        <img src={icon_user} alt=" "></img>
                    </div>

                    <div id="content-users" on >
                        <div id="navigation-users">
                            <p>Lista de Clientes</p>
                            <div id="search">
                                <img src={img_placeholder} alt=" "></img>
                                <input type="text" placeholder="Procurar" name="search" id="search-piece" onChange={()=>{sessionStorage.setItem("pesquisa", document.getElementById('search-user').value)}}/>
                            </div>
                            
                            <button id="btn-find">Localizar</button>

                            {/* <div id='botao'> */}
                                <Link to='/create' id='link'>
                                    <button 
                                        id="btn-create"
                                    >Criar</button>
                                </Link>
                            {/* </div> */}
                        </div>
                    </div>
                </>
                
                <div id="customers-container">
                    <div id="customers-content">
                        <table id="customers-table">
                            <thead>
                                <tr>
                                    <td>Nome</td>
                                    <td>Telefone</td>
                                    <td>CPF</td>
                                    <td>Ações</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.Clientes.map(Cliente =>
                                    <tr>
                                        <td>{Cliente.name_client}</td>
                                        <td>{Cliente.contact.map(numero => {
                                            var num = '(' + numero.substr(0, 2) + ') ' + numero.substr(2);
                                            Cliente.contact.length >= 2 ? num += '  |  ' : num = num;
                                            
                                            return num;
                                            })}</td>
                                        <td>{Cliente.cpf_cnpj}</td>
                                        <td id='list-customers-buttons'>
                                            <Link to='/update' >
                                                <button 
                                                    id="btn-edit"
                                                    onClick={() =>{
                                                        console.log(Cliente.id_client);
                                                        sessionStorage.setItem("Selecionado", Cliente.id_client);
                                                    }}
                                                >Editar</button>
                                            </Link>
                                            
                                            <Link to='/read'>
                                                <button 
                                                    id="btn-create"
                                                    onClick={() =>{
                                                        console.log(Cliente.id_client);
                                                        sessionStorage.setItem("Selecionado", Cliente.id_client);
                                                    }}
                                                >Listar</button>
                                            </Link>

                                            <button 
                                                id="btn-delete"
                                                onClick={() =>{
                                                    Axios.delete('http://localhost:3000/client/' + Cliente.id_client, {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}})
                                                }}
                                            >Excluir</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </>
        )
    }
}

export default index;