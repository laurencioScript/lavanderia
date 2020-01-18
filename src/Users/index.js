import React, { Component } from 'react';
import Header from '../public/header';
import img_placeholder from '../public/placeholder-img.jpg';
import './Users.css';

import TableUsers from './tableUsers';
import FormUser from './formUser';

const Connection = require('../public/connection');

class index extends Component{
    constructor (props){
        super(props);
        this.state = {
            Message: "",
            Pesquisa: ''
        };
        
        this.deleteUser = this.deleteUser.bind(this);
    }    
    deleteUser = () =>{
        if(sessionStorage.getItem("Selecionado") != ' ')
        {
            Connection.deleteUser(sessionStorage.getItem("Selecionado"))
            sessionStorage.removeItem('Selecionado');
        }else{
            this.setState({Message: "Você não tem permissão"});
        }
    }
    edituser = () =>{
        Connection.getUser(sessionStorage.getItem("Selecionado")).then(res =>{
            sessionStorage.setItem("action", 2);
            console.log(res);
            document.querySelector('#cad-container').style.display = "flex";
            document.querySelector('#form-name').value = res.name_user;
            document.querySelector('#form-password').value = "";
            document.querySelector('#form-email').value = res.email;
            document.querySelector("#form-select").value = res.level_user;
        });
    }

    _setPesquisa = async (val) =>{
        this.Pesquisa.setPesquisa(val)
    }

    _componentAtualizou = () =>{
        this.Pesquisa.componentAtualizou();
    }

    verificaNivel(){
        sessionStorage.removeItem("Selecionado");
        var retorno = ' ';
        if(sessionStorage.getItem("nivel") == 'Atendente'){
            console.log("Você não tem nivél de acesso necessario");
            retorno = 
            <> 
                <div id="reclusion">
                    <h1>Você não tem direito de acesso a está pagina</h1>
                </div>
            </>;
        }
        else{
            retorno = 
            <>
                <div id="volta">
                    <p>↪ Voltar</p>
                </div>

                <div id="icon-page">
                    <img src={img_placeholder} alt=" "></img>
                </div>

                <div id="content-users">
                    <div id="navigation-users">
                        <p>Lista de Usuários</p>
                        <div id="search">
                            <img src={img_placeholder} alt=" "></img>
                            <input 
                                type="text"    
                                placeholder="Procurar" 
                                name="search" id="search-user" 
                                onChange={(e)=>{
                                    if(e.target.value === "")
                                        setInterval(this._setPesquisa(e.target.value.toLowerCase()))
                                    else
                                        clearInterval();
                                        this._setPesquisa(e.target.value.toLowerCase())
                                }}
                                onLoad={()=>{
                                    setInterval(this._setPesquisa(""))
                                }} />
                        </div>
                        
                        <button id="btn-find">Localizar</button>

                        <button 
                            id="btn-create" 
                            onClick={() =>{
                                document.querySelector('#cad-container').style.display = "flex"; 
                                sessionStorage.setItem("action", 1);
                                document.querySelector('#form-name').value = ""
                                document.querySelector('#form-password').value = "";
                                document.querySelector('#form-email').value = "";
                                document.querySelector("#form-select").value = "";
                            }
                        }>+ Criar</button>
                        <button 
                            id="btn-delete" 
                            onClick={this.deleteUser}
                        >Excluir</button>

                        <button 
                            id="btn-edit" 
                            onClick={this.edituser}>Editar</button>
                    </div>
                </div>
                
                <TableUsers ref={(component) => {this.Pesquisa = component}} />
                
                <FormUser></FormUser>
            </>;
        }

        return retorno;
    }

    render(){
        return(
            <>
                <Header name="Usuários"/>
                {this.verificaNivel()}
            </>
        );
    }
}


export default index;