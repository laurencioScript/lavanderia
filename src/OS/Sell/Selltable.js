import React, { Component } from 'react';
// import Update from 'react-addons-update';


import './SellTable.css';
import LineTable from './LineTable';


class Selltable extends Component {

    constructor(props){
        super(props)

        this.state = {
            itens: [{Linha: 1}],
            precoT: 0,

            linhaTabela: [{}],
        }
        this.mudaPreco = this.mudaPreco.bind(this)
        this.tiraPreco = this.tiraPreco.bind(this)
        this.mudaIten = this.mudaIten.bind(this)
    }
    componentDidUpdate(){
        let precos = document.querySelectorAll("#prec_total");
        var valores=[];
        var precoTotal = 0;
        for(var a = 1; a < precos.length; a ++)
        {
            valores.push({preco: precos[a-1].innerText.slice(3)})
        }
        valores.map(preco =>{
            precoTotal += parseFloat(preco.preco);
        });
        
        sessionStorage.setItem("precoTotal", precoTotal);
    }
    mudaIten(id, iten){
        this.state.linhaTabela[id-1] = iten;
        this._pegaItens();
    }
    removeIten(id){
        this.state.linhaTabela.splice(id)
        this._pegaItens();
    }

    _pegaItens(){
        this.props.pegaItens(this.state.linhaTabela);
    }

    mudaPreco(preco){
        this.setState({precoT: parseFloat(this.state.precoT) + parseFloat(preco)}, () => {
            this.props.mudaPreco(this.state.precoT);
        });

    }
    tiraPreco(preco){
        this.setState({precoT: parseFloat(this.state.precoT) - parseFloat(preco)}, () => {
            this.props.mudaPreco(this.state.precoT);
        });
    }

    render() {
        return (
            <>
                <table className="itenTable">
                    <thead>
                        <tr>
                            <td></td>
                            <td>Peças</td>
                            <td>Cores</td>
                            <td>Caracteristicas</td>
                            <td>Defeitos</td>
                            <td>Identificação</td>
                            <td>Qtd</td>
                            <td>Unidade</td>
                            <td>Val_Unit</td>
                            <td>Val_Parcial</td>
                        </tr>
                    </thead>

                    <tbody id="itenTbody">{
                        this.state.itens.map(itens =>
                        <LineTable iten={itens.Linha} mudaPreco={this.mudaPreco} tiraPreco={this.tiraPreco} mudaIten={this.mudaIten} removeIten={this.removeIten}/>
                    )}                       
                    </tbody>
                    
                </table>

                <input 
                    id="RVadiconaLinha"
                    type="button" 
                    value="Adicionar Item" 
                    onClick={() => {
                        var linha = this.state.itens;

                        linha.push({Linha: this.state.itens.length + 1});
                        this.setState({itens: linha});
                    }} />
            </>
        );
    }
}

export default Selltable;