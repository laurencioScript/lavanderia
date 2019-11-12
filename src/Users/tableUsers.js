import React, { Component } from 'react';
import axios from 'axios';

import './tableUsers.css';

class tableUsers extends Component{   

    state = {
        Users: [],
        Selecionado: localStorage.getItem("Selecioando")
    }
    componentDidMount(){
        
        localStorage.clear();

        axios.get('http://localhost:3000/user/')
        .then(res => {
            var Users = res.data;
            const result = Users.result
            Users = result[0];

            this.setState({Users});
        });
    }

    verificaLista = (linha) =>{
        var tabela = document.getElementById("corpo_tabela");
        var linhas = tabela.getElementsByTagName("tr");

        for(var i = 0; i < linhas.length; i++){
            var a = linhas[i];
            a.classList.remove("selecionado");
        }
        linha.classList.toggle("selecionado");
    }

    nomeNivel = (nv) =>{
        var nivel = "";
        switch(nv){
            case 1: {nivel = "Atendente"; break;}
            case 2: {nivel = "Administrador"; break;}
            case 3: {nivel = "Mestre"; break;}
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
                <tbody id="corpo_tabela">
                    {this.state.Users.map(Users => 
                    <tr onClick={() => {
                        localStorage.setItem("Selecionado", localStorage.getItem("Selecionado") == Users.id_usuario ? null : Users.id_usuario);
                        this.verificaLista(document.getElementById(Users.id_usuario));
                    }} id={Users.id_usuario}>
                        <td>{Users.nome}</td>
                        <td>{Users.email}</td>
                        <td>{this.nomeNivel(Users.nivel)}</td>
                    </tr>
                    )}
                </tbody>
            </table>
            </div>
        );
    }
}

export default tableUsers;