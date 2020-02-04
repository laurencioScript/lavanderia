import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './screenUser.css';
import img_placeholder from './../public/placeholder-img.jpg';
import Header from './../components/header';
import TableUsers from './../components/tableUsers';
import FormUser from './../components/formUser';

import UserService from './../service/UserService';

class User extends Component{
    
    constructor (props){
        super(props);
        this.state = {
            Message: "",
            Pesquisa: ''
        };
        
        this.delete = this.delete.bind(this);
    }   
    
    delete = () =>{
        if(sessionStorage.getItem("Selecionado") != ' ')
        {
            UserService.deleteUser(sessionStorage.getItem("Selecionado"))
            sessionStorage.removeItem('Selecionado');
        }else{
            this.setState({Message: "Você não tem permissão"});
        }
    }


    update = () =>{
            UserService.getUser(sessionStorage.getItem("Selecionado")).then(res =>{
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


    render(){
        return(
            <>
                <Header name="Usuários"/>
                
                <Link id="btnVoltar" to="/Menu"> 
                    <button type="button" >Voltar</button>
                </Link> 

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
                        }>Criar</button>

                        <button id="btn-delete" onClick={this.delete} >Excluir</button>

                        <button id="btn-edit" onClick={this.update}>Editar</button>
                    </div>
                </div>
                
                <TableUsers ref={(component) => {this.Pesquisa = component}} />
                
                <FormUser></FormUser>
            </>
        );
    }
}


export default User;