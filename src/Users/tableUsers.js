import React, { Component } from 'react';

import './tableUsers.css';

const Connection = require('../public/connection');

class tableUsers extends Component{   

    state = {
        Users: [],
        Selecionado: localStorage.getItem("Selecioando"),
        Conteudo: [],
        Pesquisa: "",
        Atualiza: true
    }
    componentDidMount(){
        localStorage.clear();

        Connection.getUsers().then(res => {
            var Users = res;
            this.setState({Users,
            Conteudo: res});
        });
    }
    conponentAtualiza(){
        Connection.getUsers().then(res => {
            var Users = res;
            this.setState({Users});
        });
    }

    limpaLista = () =>{
        var tabela = document.getElementById("corpo_tabela");
        var linhas = tabela.getElementsByTagName("tr");

        for(var i = 0; i < linhas.length; i++){
            var a = linhas[i];
            a.classList.remove("selecionado");
        }
    }
    verificaLista = (linha) =>{
        this.limpaLista();
        linha.classList.toggle("selecionado");
    }

    nomeNivel = (nv) =>{
        var nivel = "";
        switch(nv){
            case 1: {nivel = "Mestre"; break;}
            case 2: {nivel = "Administrador"; break;}
            case 3: {nivel = "Atendente"; break;}
        };
        return nivel;
    }

    setPesquisa = async (Pesquisa) =>{
        await this.pesquisa(Pesquisa).then(()=>{
        })
    }

    pesquisa = async (val) => {
        val === "" 
        ? this.setState({Conteudo: await Connection.getUsers()})
        : this.setState({Conteudo: this.retornaPesquisa(val)});
    }

    retornaPesquisa = val =>{
        var data = this.state.Users.map(res => {
            return  res.name_user.toLowerCase().search(val) !== -1 ||
                    res.email.toLowerCase().search(val) !== -1 ||
                    this.nomeNivel(res.level_user).toLowerCase().search(val) !== -1
                    ? res : undefined;
        });

        return data
    }

    validaConteudo(){
        return this.state.Conteudo
    }
    
    render(){
        return(
            <div id="table-users">
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Nível</th>
                    </tr>
                </thead>
                <tbody id="corpo_tabela" >{
                this.validaConteudo().map(Users => {
                    if(Users !== undefined){
                        return (
                            <tr onClick={() => {
                                sessionStorage.setItem("Selecionado", localStorage.getItem("Selecionado") == Users.id_user ? null : Users.id_user);
                                this.verificaLista(document.getElementById(Users.id_user));
                            }}
                            id={Users.id_user}>
                                <td id="user-name">{Users.name_user}</td>
                                <td id="user-email">{Users.email}</td>
                                <td id="user-nivel">{this.nomeNivel(Users.level_user)}</td>
                            </tr>
                        );
                    }
                })}
                </tbody>
            </table>
            </div>
        );
    }
}

export default tableUsers;