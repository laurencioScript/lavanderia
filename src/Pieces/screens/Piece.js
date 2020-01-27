// React
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Global & CSS
import Header from '../../public/header';
import img_placeholder from '../../public/placeholder-img.jpg';
import './pieces.css';
//Components
import TablePieces from './../components/tablePieces';
import FormPieces from './../components/formPieces';
import PiecesReadjustment from './../components/piecesReadjustment';
// Service
import { deletePiece, getPiece, getPieces, postPiece, putPiece } from './../PiecesService';

class pieces extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            Pesquisa: ""
        }
    }

    _setPesquisa = async (val) => {
        this.Pesquisa.setPesquisa(val);
    }

    render() {
        return (
            <>
                <Header name="peças" />

                <Link id="btnVoltar" to="/Menu"> 
                    <button type="button" >↪ Voltar</button>
                </Link> 

                <div id="icon-page">
                    <img src={img_placeholder} alt=" "></img>
                </div>

                <div id="content-users">
                    <div id="navigation-users">
                        <p>Lista de Peças</p>
                        <div id="search">
                            <img src={img_placeholder} alt=" "></img>
                            <input
                                type="text"
                                placeholder="Procurar"
                                name="search" id="search-pieces"
                                onChange={(e) => {
                                    this._setPesquisa(e.target.value.toLowerCase())
                                }} />
                        </div>

                        <button id="btn-find">Localizar</button>

                        <button
                            id="btn-create"
                            onClick={() => {
                                document.querySelector('#formPieces-container').style.display = "flex";
                                sessionStorage.setItem("action", 1);
                                document.querySelector('#pieces-name').value = ""
                                document.querySelector('#pieces-unit').value = "";
                                document.querySelector('#pieces-value').value = "";
                            }}
                        >Criar</button>
                        <button
                            id="btn-edit-pieces"
                            onClick={() => {
                                getPiece(sessionStorage.getItem("Selecionado")).then(res => {
                                    sessionStorage.setItem("action", 2);
                                    document.querySelector('#formPieces-container').style.display = "flex";
                                    document.querySelector('#pieces-name').value = res.piece_name;
                                    document.querySelector('#pieces-unit').value = res.unity;
                                    document.querySelector('#pieces-value').value = res.value;

                                    console.log(res);
                                });
                            }}
                        >Editar</button>

                        <button
                            id="btn-readjustment"
                            onClick={() => {
                                document.querySelector('#piecesReadjustment-container').style.display = "flex";
                            }}
                        >Reajuste %</button>
                    </div>
                </div>

                <TablePieces ref={(component) => { this.Pesquisa = component }} />
                <FormPieces />
                <PiecesReadjustment />
            </>
        )
    }
}

export default pieces;