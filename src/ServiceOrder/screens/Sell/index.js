import React, { Component } from 'react';
import Select from 'react-select';
import Header from '../../public/header';

import icon_caixa from '../../public/icons/icon_caixa.png';
import Axios from 'axios';

import './Sell.css';
import Selltable from './Selltable';
import CADcliente from './CADcliente/CADcliente';
import Pagamento from './Pagamento/Pagamento';

class index extends Component {
    constructor(props){
        super(props)

        this.state = {
            clientes: [],
            OptionCliente: [],
            SelectedOption: null,


            pagamento:{
                debito: 0,
                credito: 0,
                cheque: 0,
                dinheiro: 0,
                desconto: 0,
                totalPago: 0,
                precoTotal: 0
            },

            itens:[{
                amount: null,
                unity: null,
                value_unity: null,
                value_total: null,
                piece: null,
                color: null,
                defect: null,
                characteristics: [null]
            }]
        }
        this.mudaPreco = this.mudaPreco.bind(this)
        this.mudaPagamento = this.mudaPagamento.bind(this)
    }

    mudaPreco(precoTotal){
        this.setState({ pagamento: {precoTotal} }, () => {
            console.log("ODIN " + this.state.pagamento.precoTotal);
        });
    }
    mudaPagamento(pagamento){
        this.setState({pagamento: {
            debito: pagamento.debito,
            credito: pagamento.credito,
            cheque: pagamento.cheque,
            dinheiro: pagamento.dinheiro,
            desconto: pagamento.desconto,
            totalPago: pagamento.totalPago
        }});
    }

    componentDidMount(){
        Axios.get('http://localhost:3000/client', {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}}).then(res =>{
            var clientes = res.data.result;

            this.setState({clientes});
            this.montaOption();
        });

        document.querySelector("#sell-DateSell").value = this.pegaData();

        sessionStorage.removeItem("precoTotal");
    }
    handleChange = SelectedOption =>{
        this.setState({SelectedOption}, () => console.log("Optin Selected: ", this.state.SelectedOption));
    }
    montaOption(){
        var OptionCliente = [];

        this.state.clientes.map(Cliente =>{
            OptionCliente.push({value: Cliente.id_client, label: Cliente.name_client});
        });

        this.setState({OptionCliente});
    }

    pegaData(){
        var date = new Date();

        return date.getFullYear() + "-" + date.getMonth() + "-" +date.getDate();
    }

    render() {
        return (
            <>
                <Header name="REALIZAR VENDA"/>

                <input id="btnCancelarVenda" type="button" value="Cancelar" />

                <div id="volta">
                    <p>↪ Voltar</p>
                </div>

                <div id="icon-page">
                    <img src={icon_caixa} alt=" "></img>
                </div>


                <div id="osRV-content">
                    <div id="primeira-parte">
                        <Select options={this.state.OptionCliente} onChange={this.handleChange} value={this.state.SelectedOption} />

                        <p>OU</p>

                        <input type="button" value="Cadastrar"onClick={()=>{
                            document.querySelector("#quickCADcustomer-Container").style.display = "flex";
                        }}/>
                    </div>


                    <div id="segunda-parte">
                        <div>
                            <p>Data de Pagamento</p>
                            <input id="sell-DateSell" type="date" className="date" onClick={() => {
                                
                            }} />
                        </div>

                        <div>
                            <p>Data de Entrega</p>
                            <input type="date" className="date"/>
                        </div>
                    </div>
                </div>
                
                <Selltable mudaPreco={this.mudaPreco}/>

                <div id="RVfinal">
                    
                        <div id="RVobservacao">
                            <p>Obervação de Venda</p>
                            <textarea placeholder="Observações"/>
                        </div>
                        <div id="RVfinalizar">
                            <p id="ValorTotal">Valor Total: R$ {this.state.pagamento.precoTotal}</p>
    
                            <input type="button" value="Pagamento"onClick={()=>{
                                document.querySelector("#RVpagamentoContainer").style.display = "flex";
                            }}/>
                            
                            <input type="button" value="Finalizar"/>
                            
                        </div>
                </div>

                <CADcliente />
                <Pagamento precoTotal={this.state.pagamento.precoTotal} mudaPagamento={this.mudaPagamento}/>

            </>
        );
    }
}

export default index;