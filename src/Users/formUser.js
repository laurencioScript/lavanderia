import React from 'react';
import axios from  'axios';
import './formUser.css';

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
            <form>
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
                            <option value="Atendente">Atendente</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Mestre">Mestre</option>
                        </select>
                    </div>
                </div>
            </form>
            
            <input type="button" id="btn_formUser" value="Salvar" onClick={() =>{
                var nivel = document.querySelector('#form-select').value;
                if(nivel == "Atendente"){
                    nivel = 1;
                }else if(nivel == "Administrador"){
                    nivel = 2;
                }else if(nivel == "Mestre"){
                    nivel = 3;
                }
                var data = {
                    "name":document.querySelector('#form-name').value,
	                "password":document.querySelector('#form-password').value,
	                "email":document.querySelector('#form-email').value,
	                "level": document.querySelector('#form-select').value
                }

                axios.post('http://localhost:3000/user/register', data);
            }}/>
            
        </div>
    </div>
    )
  } 
}

export default formUser;