import React, {Component} from 'react';

const Connection = require('../public/connection');

class tablePieces extends Component{
    state = {
        Pieces: [],
        Conteudo: [],
        Pesquisa: "",
        Atualiza: true
    }
     componentDidMount(){
         Connection.getPieces().then(res => {
            this.setState({Pieces: res, Conteudo: res});
        });
    }
    componentDidUpdate(){
        if(this.state.Atualiza)
            this.componentAtualiza();
    }
    componentAtualiza(){
        Connection.getPieces().then(res => {
            this.setState({Pieces: res, Conteudo: res});
        });        
    }

    setPesquisa = async (Pesquisa) =>{
        await this.pesquisa(Pesquisa).then(()=>{
        })
    }

    pesquisa = async (val) => {
        val === "" 
        ? this.setState({Conteudo: await Connection.getPieces(), Atualiza: true})
        : this.setState({Conteudo: this.retornaPesquisa(val), Atualiza: false});
    }

    retornaPesquisa = val =>{
        var data = this.state.Pieces.map(res => {
            return  res.piece_name.toLowerCase().search(val) !== -1 ||
                    res.unity.toLowerCase().search(val) !== -1 
                    ? res : undefined;
        });

        return data
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
                this.state.Conteudo.map(Pieces => {
                    if(Pieces !== undefined){
                        return(
                        <tr onClick={() => {
                            sessionStorage.setItem("Selecionado", localStorage.getItem("Selecionado") == Pieces.id_piece ? null : Pieces.id_piece);
                            this.verificaLista(document.getElementById(Pieces.id_piece));                        
                        }} id={Pieces.id_piece}>
                            <td id="pices-name">{Pieces.piece_name}</td>
                            <td id="pices-email">{Pieces.unity}</td>
                            <td id="pieces-nivel">{"R$ " + Pieces.value}</td>
                        </tr>)
                    }
                })}
                </tbody>
                </table>
            </>
        )
    }
}

export default tablePieces;