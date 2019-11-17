import React, { Component } from 'react';
import Header from '../public/header';
import axios from 'axios';
import img_placeholder from '../public/placeholder-img.jpg';
import './Users.css';

import TableUsers from './tableUsers';
import FormUser from './formUser';

class index extends Component{
    constructor (props){
        super(props);
        this.state = {
            Message: ""
        };
        
        this.deleteUser = this.deleteUser.bind(this);
    }
    
    deleteUser = () =>{
        if(sessionStorage.getItem("Selecionado") != ' ')
        {
            axios.delete('http://localhost:3000/user/'+sessionStorage.getItem("Selecionado"));
            sessionStorage.removeItem('Selecionado');
        }else{
            this.setState({Message: "Você não tem permissão"});
        }
    }
    verificaNivel(){
        sessionStorage.removeItem("Selecionado");
        var retorno = ' ';
        if(sessionStorage.getItem("Nivel") == 'Atendente'){
            console.log("Você não tem nivél de acesso necessario");
            retorno = 
            <> 
                <h1>Você não tem direito de acesso a está pagina</h1>
            </>;
        }
        else{
            retorno = 
            <>
                <div id="volta">
                    <img src={img_placeholder} alt=" "></img>
                    <p>Voltar</p>
                </div>

                <div id="icon-page">
                    <img src={img_placeholder} alt=" "></img>
                </div>

                <div id="content-users">
                    <div id="navigation-users">
                        <p>Lista de Usuários</p>
                        <div id="search">
                            <img src={img_placeholder} alt=" "></img>
                            <input type="text" placeholder="Procurar" name="search"></input>
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
                            onClick={() =>{
                                axios.get('http://localhost:3000/user/'+sessionStorage.getItem("Selecionado")).then( res =>{
                                    sessionStorage.setItem("action", 2);
                                    document.querySelector('#cad-container').style.display = "flex";
                                    document.querySelector('#form-name').value = res.data.result[0][0].nome;
                                    document.querySelector('#form-password').value = "";
                                    document.querySelector('#form-email').value = res.data.result[0][0].email;
                                    document.querySelector("#form-select").value = res.data.result[0][0].nivel;
                                });
                            }
                        }>Editar</button>
                    </div>
                </div>
                
                <TableUsers></TableUsers>
                
                <FormUser></FormUser>
            </>;
        }

        return retorno;
    }

    render(){
        return(
            <>
                <Header></Header>
                {this.verificaNivel()}
            </>
        );
    }
}

export default index;