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
        Axios.get("http://loacalhost:3000/client").then(res =>{
            this.setState({Clientes: res.data.result[0]});
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
                            <p>Lista de Cores</p>
                            <div id="search">
                                <img src={img_placeholder} alt=" "></img>
                                <input type="text" placeholder="Procurar" name="search" id="search-piece" onChange={()=>{sessionStorage.setItem("pesquisa", document.getElementById('search-user').value)}}/>
                            </div>
                            
                            <button id="btn-find">Localizar</button>

                            {/* <Link to='/create'> */}
                                <button 
                                    id="btn-create"
                                >Criar</button>
                            {/* </Link> */}
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
                                {/* Encapsular em um .map() */}
                                <tr>
                                    <td>{/* Cliente.nome */}</td>
                                    <td>{/* Cliente.telefone */}</td>
                                    <td>{/* Cliente.cpf */}</td>
                                    <td id='list-customers-buttons'>
                                        <button 
                                            id="btn-edit"
                                        >Editar</button>

                                        <button 
                                            id="btn-create"
                                        >Listar</button>

                                        <button 
                                            id="btn-delete"
                                        >Excluir</button>
                                    </td>
                                </tr>
                                {/*                          */}
                            </tbody>
                        </table>
                    </div>

                </div>
            </>
        )
    }
}

export default index;