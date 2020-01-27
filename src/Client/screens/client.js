import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Header from '../../public/header';

import icon_user from '../../public/icons/icon_user.png';
import img_placeholder from '../../public/placeholder-img.jpg';


import './customers.css';
import { deleteCustomer, getCustomer,getCustomers,putCustomer,postCustomer} from './../ClienteService';


class index extends Component{
    state = {
        Clientes: [],
        Conteudo: [],
        Atauliza: true
    }

    componentDidMount(){
        getCustomers().then(res =>{
            this.setState({Clientes: res, Conteudo: res});
            sessionStorage.removeItem("Selecionado");
        })
    }
    componentDidUpdate(){
        if(this.state.Atualiza)
           {this.componenAtualiza();}
    }
    componenAtualiza(){
        getCustomers().then(res => {
            var Clientes = res;
            this.setState({Clientes, Conteudo: Clientes});
        });
    }
    pesquisa = async (val) => {
        val === "" 
        ? this.setState({Atualiza: true, Conteudo: await getCustomers() })
        : this.setState({Conteudo: this.retornaPesquisa(val), Atualiza: false});
    }

    retornaPesquisa = (val) =>{
        var data = this.state.Clientes.map(res => {
            return  res.name_client.toLowerCase().search(val) !== -1  ||
                    res.cpf_cnpj.toLowerCase().search(val) !== -1
                    ? res : undefined;
        });

        return data
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
                                <input 
                                    type="text"    
                                    placeholder="Procurar" 
                                    name="search" id="search-measures" 
                                    onChange={(e)=>{
                                        this.pesquisa(e.target.value.toLowerCase()).then(console.log(e.target.value))
                                }} />
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
                                    <td>CPF/CNPJ</td>
                                    <td>Ações</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.Conteudo.map(Cliente =>{
                                    if(Cliente !== undefined)
                                        return(
                                            <tr>
                                                <td>{Cliente.name_client}</td>
                                                <td>{Cliente.contact.map(numero => {
                                                    var num = '(' + numero.substr(0, 2) + ') ' + numero.substr(2);
                                                    Cliente.contact.length >= 2 ? num += '  |  ' : num = num;
                                                    
                                                    return num;
                                                    })}</td>
                                                <td>{Cliente.cpf_cnpj}</td>
                                                <td id='list-customers-buttons'>
                                                    {/* <Link to='/update' > */}
                                                        <button 
                                                            id="btn-edit"
                                                            onClick={() =>{
                                                                console.log(Cliente.id_client);
                                                                sessionStorage.setItem("Selecionado", Cliente.id_client);
                                                                this.props.history.push('/update');
                                                            }}
                                                        >Editar</button>
                                                    {/* </Link> */}
                                                    
                                                    {/* <Link to='/read'> */}
                                                        <button 
                                                            id="btn-create"
                                                            onClick={() =>{
                                                                console.log(Cliente.id_client);
                                                                sessionStorage.setItem("Selecionado", Cliente.id_client);
                                                                this.props.history.push('/read');
                                                            }}
                                                        >Listar </button>
                                                    {/* </Link> */}

                                                    <button 
                                                        id="btn-delete"
                                                        onClick={() =>{
                                                            deleteCustomer(Cliente.id_client);
                                                            console.log("DELETEI")
                                                            console.log(Cliente.id_client)
                                                        }}
                                                    >Excluir</button>
                                                </td>
                                            </tr> 
                                        )
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </>
        )
    }
}

export default index;