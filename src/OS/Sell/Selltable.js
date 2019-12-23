import React, { Component } from 'react';

import './SellTable.css';
import LineTable from './LineTable';

class Selltable extends Component {
    state = {
        itens: [{Linha: 1}]
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
        document.querySelector("#ValorTotal").innerHTML = "Valor Total: R$ " + precoTotal;
        
        sessionStorage.setItem("precoTotal", precoTotal);
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
                        <LineTable iten={itens.Linha} />
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