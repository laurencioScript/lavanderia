import React, {Component} from 'react';

import './pieces.css';
import Header from '../public/header';
import TablePieces from './tablePieces';

import img_placeholder from '../public/placeholder-img.jpg';

class pieces extends Component{
    render(){
        return(
            <>
                <Header/>

                <div id="volta">
                    {/* <img src={img_placeholder} alt=" "></img> */}
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
                            <input type="text" placeholder="Procurar" name="search" id="search-user" onChange={()=>{sessionStorage.setItem("pesquisa", document.getElementById('search-user').value)}}/>
                        </div>
                        
                        <button id="btn-find">Localizar</button>

                        <button 
                            id="btn-create" 
                        >+ Criar</button>
                        <button 
                            id="btn-delete"
                        >Excluir</button>

                        <button 
                            id="btn-readjustment" 
                        >Reajuste %</button>
                    </div>
                </div>

                <TablePieces/>
            </>
        )
    }
}

export default pieces;