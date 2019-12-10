import React, {Component} from 'react';
import Axios from 'axios';

import './pieces.css';
import Header from '../public/header';
import TablePieces from './tablePieces';
import FormPieces from './formPieces';
import PiecesReadjustment from './piecesReadjustment';

import img_placeholder from '../public/placeholder-img.jpg';

class pieces extends Component{
    render(){
        return(
            <>
                <Header name="peças"/>

                <div id="volta">
                    <p>↪ Voltar</p>
                </div>

                <div id="icon-page">
                    <img src={img_placeholder} alt=" "></img>
                </div>

                <div id="content-users">
                    <div id="navigation-users">
                        <p>Lista de Peças</p>
                        <div id="search">
                            <img src={img_placeholder} alt=" "></img>
                            <input type="text" placeholder="Procurar" name="search" id="search-piece" onChange={()=>{sessionStorage.setItem("pesquisa", document.getElementById('search-user').value)}}/>
                        </div>
                        
                        <button id="btn-find">Localizar</button>

                        <button 
                            id="btn-create" 
                            onClick={() =>{
                                document.querySelector('#formPieces-container').style.display = "flex";
                                sessionStorage.setItem("action", 1);
                                document.querySelector('#pieces-name').value = ""
                                document.querySelector('#pieces-unit').value = "";
                                document.querySelector('#pieces-value').value = "";
                            }}
                        >Criar</button>
                        <button 
                            id="btn-edit"
                            onClick={() =>{
                                Axios.get('http://localhost:3000/piece/'+sessionStorage.getItem("Selecionado")).then( res =>{
                                    sessionStorage.setItem("action", 2);
                                    document.querySelector('#formPieces-container').style.display = "flex";
                                    document.querySelector('#pieces-name').value = res.data.result[0][0].peca;
                                    document.querySelector('#pieces-unit').value = res.data.result[0][0].unidade;
                                    document.querySelector('#pieces-value').value = res.data.result[0][0].valor;

                                    console.log(res);
                                });
                            }}
                        >Editar</button>

                        <button 
                            id="btn-readjustment" 
                            onClick={() =>{
                                document.querySelector('#piecesReadjustment-container').style.display = "flex";
                            }}
                        >Reajuste %</button>
                    </div>
                </div>

                <TablePieces/>
                <FormPieces />
                <PiecesReadjustment />
            </>
        )
    }
}

export default pieces;