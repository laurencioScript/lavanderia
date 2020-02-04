import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import './sellTable.css';
import LineTable from './SellLineTable';

import PieceService from './../service/PiecesService';
import ColorService from './../service/ColorsService';
import CharacService from './../service/CharacService';
import DefectService from './../service/DefectService';

class Selltable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            itens: [{
                id: 1, 
                piece: '',
                amount: 1,
                unity: '',
                value_unity: 0,
                value_total: 0,
                SelectedOption: '',
                SelectedOptionCaract: '',
                SelectedOptionDefeitos: '',
                SelectedOptionCores: '',
            }],
            precoT: 0,
            Option: {}
        }
        // this.mudaPreco = this.mudaPreco.bind(this)
        // this.tiraPreco = this.tiraPreco.bind(this)
        this.loadProperty();
    }


    // Carrega os dados necessarios para colocar nos elementos Selects
    loadProperty() {
        let Option = {
            Pecas: [],
            Cores: [],
            Caract: [],
            Defeitos: []
        };

        Promise.all([PieceService.getPieces(), ColorService.getColors(), CharacService.getCharacteristics()
            , DefectService.getDefects()]).then((result) => {
                let Pecas = result[0], Cores = result[1], Caract = result[2], Defeitos = result[3];

                Pecas.map(Peca => { Option.Pecas.push({ value: Peca, label: Peca.piece_name }); });
                Cores.map(cor => { Option.Cores.push({ value: cor, label: cor.color_name }); });
                Caract.map(caract => { Option.Caract.push({ value: caract, label: caract.characteristic_name }); });
                Defeitos.map(Defeitos => { Option.Defeitos.push({ value: Defeitos, label: Defeitos.defect_name }); });

                this.setState({
                    Option
                });

            });


    }

    // componentDidUpdate(){
    //     let precos = document.querySelectorAll("#prec_total");
    //     var valores=[];
    //     var precoTotal = 0;
    //     for(var a = 1; a < precos.length; a ++)
    //     {
    //         valores.push({preco: precos[a-1].innerText.slice(3)})
    //     }
    //     valores.map(preco =>{
    //         precoTotal += parseFloat(preco.preco);
    //     });
    //     // document.querySelector("#ValorTotal").innerHTML = "Valor Total: R$ " + precoTotal;

    //     sessionStorage.setItem("precoTotal", precoTotal);
    // }



    mudaPreco(preco) {
        this.setState({ precoT: parseFloat(this.state.precoT) + parseFloat(preco) }, () => {
            // console.log(this.state.precoT);

            this.props.mudaPreco(this.state.precoT);
        });

    }

    tiraPreco(preco) {
        this.setState({ precoT: parseFloat(this.state.precoT) - parseFloat(preco) }, () => {
            // console.log(this.state.precoT);

            this.props.mudaPreco(this.state.precoT);
        });
    }

    _getState(value){
        console.log(this.state.itens);
        
        
        let itensState = this.state.itens;

        for (let iten of itensState) {
            console.log(iten,value);
            
            iten = iten.id == value.id ? value : iten;
        }
        
        this.setState({itens:itensState});
    }

    loadLineTable() {
        console.log('Start',this.state.itens);
        // O componente LineTable so pode ser renderizado quando o state Option for carregado
        if (this.state.Option.Pecas != undefined) {

            return this.state.itens.map(itens =>
                <LineTable onChange={this._getState.bind(this)} id={itens.id} option={this.state.Option} />
            )

        }

        return <></>
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
                            <td>Qtd</td>
                            <td>Unidade</td>
                            <td>Val_Unit</td>
                            <td>Val_Parcial</td>
                        </tr>
                    </thead>

                    <tbody id="itenTbody">
                        {this.loadLineTable()}
                    </tbody>

                </table>

                <input
                    id="RVadiconaLinha"
                    type="button"
                    value="Adicionar Item"
                    onClick={() => {
                        var linha = this.state.itens;

                        linha.push({ Linha: this.state.itens.length + 1 });
                        this.setState({ itens: linha });
                    }} />
            </>
        );
    }
}

export default Selltable;