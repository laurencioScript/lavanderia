import React, { Component } from 'react';

import './formPieces.css';

import { deletePiece, getPiece, getPieces, postPiece, putPiece } from './../PiecesService';
import { getUnitys, } from './../../Unity/UnityService';

class formPieces extends Component {
    state = {
        Unidade: []
    }

    componentDidMount() {
        getUnitys().then(res => { 
            console.log(res);
            
            this.setState({ Unidade: res.map(map => { return map.unity_name }) })
        })
    }

    closeForm() {
        document.querySelector('#formPieces-container').style.display = "none";
    }

    render() {
        return (
            <div id="formPieces-container">
                <input type='button' value="X" id='btn_fechar' onClick={this.closeForm} />
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
                            <select id="pieces-unit">{
                                this.state.Unidade.map(unity => <option key={unity} value={unity}>{unity}</option>)
                            }</select>
                        </div>
                        <div>
                            <p>Valor $</p>
                            <input
                                type="text"
                                id='pieces-value'
                            />
                        </div>
                        <input type="button" id='btn_create_pieces' value='Salvar' onClick={() => {
                            var data = {
                                "name": document.querySelector('#pieces-name').value,
                                "unity": document.querySelector('#pieces-unit').value,
                                "value": parseInt(document.querySelector('#pieces-value').value)
                            };
                            if (sessionStorage.getItem('action') == 1) {
                                postPiece(data);
                            }
                            else if (sessionStorage.getItem('action') == 2) {
                                putPiece(sessionStorage.getItem("Selecionado"), data);
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