import React, {Component} from 'react';
import Axios from 'axios';

class tablePieces extends Component{
    state = {
        Pieces: []
    }
     componentDidMount(){
         Axios.get('http://localhost:3000/piece').then(res => {
            var Pieces = res.data;
            const result = Pieces.result;            
            Pieces = result[0];

            this.setState({Pieces});
        });
    }
    componentDidUpdate(){
        localStorage.clear();

        Axios.get('http://localhost:3000/piece').then(res => {
            var Pieces = res.data;
            const result = Pieces.result;            
            Pieces = result[0];

            this.setState({Pieces});
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
                        <th>Valor $</th>
                    </tr>
                </thead>
                <tbody id="corpo_tabela">{
                this.state.Pieces.map(Pieces => 
                    <tr onClick={() => {
                        sessionStorage.setItem("Selecionado", localStorage.getItem("Selecionado") == Pieces.id_peca ? null : Pieces.id_peca);
                        this.verificaLista(document.getElementById(Pieces.id_peca));                        
                    }} id={Pieces.id_peca}>
                        <td id="pices-name">{Pieces.peca}</td>
                        <td id="pices-email">{Pieces.unidade}</td>
                        <td id="pieces-nivel">{Pieces.valor}</td>
                    </tr>
                )}
                </tbody>
                </table>
            </>
        )
    }
}

export default tablePieces;