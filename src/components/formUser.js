import React from 'react';
import './formUser.css';

import UserService from './../service/UserService';

class formUser extends React.Component{
    closeForm(){
        document.querySelector('#cad-container').style.display = "none";
    }

    render(){
        return (
            <div id='cad-container'>
                <input type='button' value="X" id='btn_fechar' onClick={this.closeForm}/>
                <div id='cad-content'>
                    <p>Cadastro de Usuário</p>
                    <form onSubmit={e =>{e.preventDefault();}}>
                        <div id='cad-primeira_linha'>
                            <div className='cad-primeiro_elemento'>
                                <p>Nome</p>
                                <input type="text" id="form-name"/>
                            </div>
                            <div className='cad-segundo_elemento'>
                                <p>Senha</p>
                                <input type="text" id="form-password"/>
                            </div>
                        </div>
                        <div id='cad-segunda_linha'>
                            <div className='cad-primeiro_elemento'>
                                <p>E-mail</p>
                                <input type="text" id="form-email"/>
                            </div>
                            <div className='cad-segundo_elemento'>
                                <p>Nivel</p>
                                <select id="form-select">
                                    <option value="1">Mestre</option>
                                    <option value="2">Administrador</option>
                                    <option value="3">Atendente</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    
                    <input type="button" id="btn_formUser" value="Salvar" onClick={() =>{
                        var data = {
                                "name": document.querySelector('#form-name').value,
                                "password": document.querySelector('#form-password').value,
                                "email": document.querySelector('#form-email').value,
                                "level": parseInt(document.querySelector('#form-select').value)
                            };
                        if(sessionStorage.getItem('action') == 1){
                            UserService.postUser(data);
                        }
                        else if(sessionStorage.getItem('action') == 2){
                            UserService.putUser(sessionStorage.getItem("Selecionado"), data);
                        }

                        sessionStorage.removeItem("action");
                    }}/>
                    
                </div>
            </div>
        )
  } 
}

export default formUser;