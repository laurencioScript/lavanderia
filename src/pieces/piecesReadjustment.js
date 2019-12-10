import React, {Component} from 'react';

import './piecesReadjustment.css';
import Axios from 'axios';

class piecesReadjustment extends Component{
    State = {
        Pecas: []
    }
    compo
    render(){
        return(
            <div id='piecesReadjustment-container'>
                <div id='piecesReadjustment-content'>
                    <p>Reajuste</p>

                    <div id='piecesReadjustment-first'>
                        <p>Peça</p>
                        <input type='checkbox' name='todas'/>
                        <label for='todas'>Todas</label>
                    </div>

                    <select>{
                        // this.state.Pieces.map()
                    }</select>

                    <div id='piecesReadjustment-second'>
                        <p>Valor do Reajuste: </p>
                        <input type='number'
                            min='1'
                            max='100'
                        />
                    </div>

                    <div id='piecesReadjustment-buttons'>
                        <input type='button'
                            id='save'
                            value='Salvar'
                            onClick={() =>{
                                
                            }}
                        />
                        <input type='button'
                            id='cancel'
                            value='Cancelar'
                            onClick={() =>{
                                document.querySelector('#piecesReadjustment-container').style.display = "none"; 
                            }}
                        />
                    </div>
                </div>

            </div>
        )
    }
}

export default piecesReadjustment;