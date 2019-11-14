import React from 'react';
import './formUser.css';

class formUser extends React.Component{
    render(){
    return (
    <div id='cad-container'>
        <div id='cad-content'>
            <p>Cadastro de Usuário</p>
            <form>
                <div id='cad-primeira_linha'>
                    <div className='cad-primeiro_elemento'>
                        <p>Nome</p>
                        <input type="text" />
                    </div>
                    <div className='cad-segundo_elemento'>
                        <p>Senha</p>
                        <input type="text"/>
                    </div>
                </div>
                <div id='cad-segunda_linha'>
                    <div className='cad-primeiro_elemento'>
                        <p>E-mail</p>
                        <input type="text"/>
                    </div>
                    <div className='cad-segundo_elemento'>
                        <p>Nivel</p>
                        <input type="text"/>
                    </div>
                </div>
            </form>

            <input type="button" text="Salvar" />
        </div>
    </div>
    )
  } 
}

export default formUser;