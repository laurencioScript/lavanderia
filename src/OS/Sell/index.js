import React, { Component } from 'react';
import Select from 'react-select';
import Header from '../../public/header';

import icon_caixa from '../../public/icons/icon_caixa.png';
import Axios from 'axios';

import './Sell.css';
import Selltable from './Selltable';
import CADcliente from './CADcliente/CADcliente';
import Pagamento from './Pagamento/Pagamento';

const Connection = require('../../public/connection');
const date = new Date()

class index extends Component {
    constructor(props){
        super(props)

        this.state = {
            clientes: [],
            OptionCliente: [],
            SelectedOption: null,

            data_pagamento: '',
            data_entrega: '',

            pagamento:{
                debito: 0,
                credito: 0,
                cheque: 0,
                dinheiro: 0,
                desconto: 0,
                totalPago: 0,
            },
            precoTotal: 0,

            itens:[],

            observacaoDeVenda: ""
        }
        this.mudaPreco = this.mudaPreco.bind(this)
        this.mudaPagamento = this.mudaPagamento.bind(this)
        this.pegaItens = this.pegaItens.bind(this)
    }

    pegaItens(itens){
        this.setState({itens});
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
            totalPago: pagamento.totalPago,
            precoTotal: pagamento.precoTotal
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
    componentDidUpdate(){ 
        this._ataulizaTotal();
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
        return date.getFullYear() + "-" + (date.getMonth()+1) + "-" +date.getDate();
    }

    _ataulizaTotal(){
        this.Pagamento.atualizaTotal(this.state.pagamento.precoTotal);
    }
    retornaSituacao(){
        var retorno = "";
        if(this.state.pagamento.totalPago >= this.state.precoTotal)
        {retorno = "Pago/falta entregar"}
        else if(this.state.pagamento.totalPago <= this.state.precoTotal)
        {retorno = "Falta pagar/falta retirar"}

        return retorno
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
                            <input id="sell-DateSell" type="date" className="date" onChange={(e) => {
                                this.setState({data_pagamento: e.target.value})
                            }} />
                        </div>

                        <div>
                            <p>Data de Entrega</p>
                            <input type="date" className="date" onChange={(e) => {
                                this.setState({data_entrega: e.target.value})
                            }}/>
                        </div>
                    </div>
                </div>
                
                <Selltable mudaPreco={this.mudaPreco} pegaItens={this.pegaItens}/>

                <div id="RVfinal">
                    
                        <div id="RVobservacao">
                            <p>Obervação de Venda</p>
                            <textarea placeholder="Observações" onChange={(e)=>{
                                this.setState({observacaoDeVenda: e.target.value})
                            }}/>
                        </div>
                        <div id="RVfinalizar">
                            <p id="ValorTotal">Valor Total: R$ {this.state.pagamento.precoTotal}</p>
    
                            <input type="button" value="Pagamento"onClick={()=>{
                                document.querySelector("#RVpagamentoContainer").style.display = "flex";
                            }}/>
                            
                            <input type="button" value="Finalizar"
                                onClick={()=>{
                                    var cliente = this.state.clientes.map(cliente => {if(cliente.id_client == this.state.SelectedOption.value){return cliente}});
                                    for(var a = 0 ; a < cliente.length; a ++)
                                    {   
                                        if(cliente[a] != undefined)
                                        {
                                            cliente = cliente[a];
                                            break;
                                        }
                                    }
                                    var date_payment =  this.state.pagamento.totalPago == 0 ? " ": date.getUTCDate() + "/" + (date.getUTCMonth()+1) + "/" + date.getFullYear()+ " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

                                    var data = {
                                        date_input: date.getUTCDate() + "/" + (date.getUTCMonth()+1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() ,
                                        date_ouput: this.state.data_entrega,
                                        date_payment: date_payment,
                                        date_removed: date_payment,
                                        observation: this.state.observacaoDeVenda === "" ? " " : this.state.observacaoDeVenda,
                                        situation: this.retornaSituacao(),
                                        
                                        client: {
                                            nome: cliente.name_client,
                                            cpf_cnpj: cliente.cpf_cnpj,
                                            contato: cliente.contact,
                                            tipo: cliente.type_client,
                                            email: cliente.email
                                        },
                                        payment:{
                                            debit_card: this.state.pagamento.debito,
                                            credit_card: this.state.pagamento.credito,
                                            check_pay: this.state.pagamento.cheque,
                                            money_pay: this.state.pagamento.dinheiro,
                                            discount: this.state.pagamento.desconto,
                                            amount_paid: this.state.pagamento.totalPago,
                                            value_total: this.state.pagamento.precoTotal,
                                        },
                                        itens: this.state.itens
                                    }
                                    console.log(data);


                                    Connection.postService(data);
                                }                                    
                            }/>
                            
                        </div>
                </div>

                <CADcliente />
                <Pagamento precoTotal={this.state.pagamento.precoTotal} mudaPagamento={this.mudaPagamento} ref={(component) => {this.Pagamento = component}} />

            </>
        );
    }
}

export default index;