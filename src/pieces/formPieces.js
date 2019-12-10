import React, {Component} from 'react';

import './formPieces.css';
import Axios from 'axios';
 
class formPieces extends Component{
    closeForm(){
        document.querySelector('#formPieces-container').style.display = "none";
    }
    
    render(){
        return(
            <div id="formPieces-container">
                <input type='button' value="X" id='btn_fechar' onClick={this.closeForm}/>
                <div id="formPieces-content">
                    <div id='formPieces-primeira_linha'>
                        <div>
                            <p>Peça</p>
                            <input
                                type="text"
                                id='pieces-name'
                            />
                        </div>
                    </div>
                    <div id='formPieces-segunda_linha'>
                        <div>
                            <p>Unidade</p>
                            <input
                                type="text"
                                id='pieces-unit'
                                />
                        </div>
                        <div>
                            <p>Valor $</p>
                            <input
                                type="text"
                                id='pieces-value'
                            />
                        </div>
                        <input type="button" id='btn_create_pieces' value='Salvar' onClick={() =>{
                            var data = {
                                "peca" : document.querySelector('#pieces-name').value,
                                "unidade" : document.querySelector('#pieces-unit').value,
                                "valor" : parseInt(document.querySelector('#pieces-value').value)
                            };
                            if(sessionStorage.getItem('action') == 1){
                                Axios.post('http://localhost:3000/piece/register', data);
                            }
                            else if(sessionStorage.getItem('action') == 2){
                                Axios.put('http://localhost:3000/piece/'+sessionStorage.getItem("Selecionado"), data);
                            }
    
                            sessionStorage.removeItem("action");
                        }} />
                    </div>
                </div>
            </div>
        )
    }
}

export default formPieces;