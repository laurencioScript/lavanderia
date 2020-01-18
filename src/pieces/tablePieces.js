import React, {Component} from 'react';

const Connection = require('../public/connection');

class tablePieces extends Component{
    state = {
        Pieces: []
    }
     componentDidMount(){
         Connection.getPieces().then(res => {
            this.setState({Pieces: res});
        });
    }
    componentDidUpdate(){
        localStorage.clear();

        Connection.getPieces().then(res => {
            this.setState({Pieces: res});
        });
    }

    limpaLista = () =>{
        var tabela = document.getElementById("corpo_tabela");
        var linhas = tabela.getElementsByTagName("tr");

        for(var i = 0; i < linhas.length; i++){
            var a = linhas[i];
            a.classList.remove("selecionado");
        }
    }
    verificaLista = (linha) =>{
        this.limpaLista();
        // linha.classList.toggle("selecionado");
        try{
            document.getElementById(sessionStorage.getItem("Selecionado")).classList.toggle("selecionado");
        }catch(e){
        }
    }

    render(){
        return(
            <>
                <table>
                <thead>
                    <tr>
                        <th>Peça</th>
                        <th>Unidade</th>
                        <th>Valor R$</th>
                    </tr>
                </thead>
                <tbody id="corpo_tabela">{
                this.state.Pieces.map(Pieces => 
                    <tr onClick={() => {
                        sessionStorage.setItem("Selecionado", localStorage.getItem("Selecionado") == Pieces.id_piece ? null : Pieces.id_piece);
                        this.verificaLista(document.getElementById(Pieces.id_piece));                        
                    }} id={Pieces.id_piece}>
                        <td id="pices-name">{Pieces.piece_name}</td>
                        <td id="pices-email">{Pieces.unity}</td>
                        <td id="pieces-nivel">{"R$ " + Pieces.value}</td>
                    </tr>
                )}
                </tbody>
                </table>
            </>
        )
    }
}

export default tablePieces;