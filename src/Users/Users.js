import React, { Component } from 'react';
import img_placeholder from '../public/placeholder-img.jpg';
import './Users.css';

import TableUsers from './tableUsers';

class Users extends Component{
    render(){
        return(
            <>
                <div id="volta">
                    {/* <a> */}
                        <img src={img_placeholder} alt=" "></img>
                        <p>Voltar</p>
                    {/* </a> */}
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

                        <button id="btn-create">+ Criar</button>
                        <button id="btn-delete">Excluir</button>
                        <button id="btn-edit">Editar</button>
                    </div>
                </div>
                
                <TableUsers></TableUsers>
            </>
        );
    }
}

export default Users;