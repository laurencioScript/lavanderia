import React, { Component } from 'react';
import axios from 'axios';

import './tableUsers.css';

class tableUsers extends Component{   

    state = {
        Users: [],
        Selecionado: localStorage.getItem("Selecioando"),
        Pesquisa: []
    }
    componentDidMount(){
        localStorage.clear();

        axios.get('http://localhost:3000/user/' ,{headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}})
        .then(res => {
            var Users = res.data.result;
            this.setState({Users});
        });
    }
    componentDidUpdate(){
        // this.state.Users = [];
        localStorage.clear();

        axios.get('http://localhost:3000/user/' ,{headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}})
        .then(res => {
            var Users = res.data;
            const result = Users.result
            if(Users.data != result.data){
                this.forceUpdate();
            }
            Users = result;


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
                <tbody id="corpo_tabela">{
                this.state.Users.map(Users => 
                    <tr onClick={() => {
                        sessionStorage.setItem("Selecionado", localStorage.getItem("Selecionado") == Users.id_user ? null : Users.id_user);
                        this.verificaLista(document.getElementById(Users.id_user));
                    }} id={Users.id_user}>
                        <td id="user-name">{Users.name_user}</td>
                        <td id="user-email">{Users.email}</td>
                        <td id="user-nivel">{this.nomeNivel(Users.level_user)}</td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
        );
    }
}

export default tableUsers;