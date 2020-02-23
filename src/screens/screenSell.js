import React, { Component } from 'react';
import Select from 'react-select';
import { Link, Redirect } from 'react-router-dom';
import './screenSell.css';
import icon_caixa from './../public/icons/icon_caixa.png';
import Header from './../components/header';
import Selltable from '../components/sellTable';
import RegisterClient from './../components/sellFastRegisterClient';
import Pagamento from './../components/sellPagamento';
import ServiceClient from './../service/ClienteService';


class index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            viewNewClient:false,
            optionsClientes: [],
            cliente: null,
            pagamento: {
                debito: 0,
                credito: 0,
                cheque: 0,
                dinheiro: 0,
                desconto: 0,
                totalPago: 0,
                precoTotal: 0
            },
            itens: [{
                amount: 1,
                unity: "",
                value_unity: 0,
                value_parcial: 0,
                piece: "",
                color: [],
                defect: [],
                characteristics: []
            }],
            clickViewPagamento: false
        }

        this.loadClients();
        this.mudaPreco = this.mudaPreco.bind(this)
        this.mudaPagamento = this.mudaPagamento.bind(this)
    }

    closeViewNewClient(value){ this.setState({viewNewClient:value}) }

    selectCustomer = customer => { this.setState({ cliente: customer }) }

    mudaPreco(precoTotal) {
        this.setState({ pagamento: { precoTotal } }, () => {
            // console.log("ODIN " + this.state.pagamento.precoTotal);
        });
    }

    changeViewClick() {
        this.setState({ clickViewPagamento: false });
    }

    updateItens(itens) {
        this.setState({ itens })
        console.log('Update Itens Screen ', itens);
        this.updateTotalCost()
    }

    updateTotalCost() {
        this.state.pagamento.precoTotal = 0;
        for (let item of this.state.itens) {
            this.state.pagamento.precoTotal += +item.value_parcial;
        }
        this.setState({
            pagamento: this.state.pagamento
        })
    }

    mudaPagamento(pagamento) {
        // console.log('mudaPagamento');

        this.setState({
            pagamento: {
                debito: pagamento.debito,
                credito: pagamento.credito,
                cheque: pagamento.cheque,
                dinheiro: pagamento.dinheiro,
                desconto: pagamento.desconto,
                totalPago: pagamento.totalPago
            }
        });
    }

    loadClients() {
        ServiceClient.getCustomers().then((clientes) => {
            let optionsClientes = []
            clientes.map(cliente => {
                optionsClientes.push({ value: cliente.id_client, label: cliente.name_client });
            });
            this.setState({ optionsClientes });
        });
    }

    pegaData() {
        var date = new Date();
        // console.log('pegaData');

        return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    }

    updateClients(){
        this.loadClients();
    }

    render() {

        return (
            <>
                <Header name="REALIZAR VENDA" />

                <div id="icon-page"> <img src={icon_caixa} alt=" "></img> </div>

                <div style={{ display: "flex", padding: "0px 100px", justifyContent: "space-around" }}>

                    <div style={{ display: "flex", flexDirection: "column", width: "500px" }}>
                        <Select options={this.state.optionsClientes} onChange={this.selectCustomer} value={this.state.cliente} />
                    </div>
                    
                    <button type="button" onClick={() => {this.setState({viewNewClient:true})}} style={{ padding: "0px 15px" }}>+</button>

                    <div style={{}}>
                        <p>Data de Pagamento</p>
                        <input type="date" className="date" />
                    </div>

                    <div style={{}}>
                        <p>Data de Entrega</p>
                        <input type="date" className="date" />
                    </div>
                </div>

                <Selltable updateItens={this.updateItens.bind(this)} mudaPreco={this.mudaPreco} />

                <div style={{ display: "flex", "justify-content": "space-between" }}>

                    <div style={{ width: "50%", padding: "20px 25px" }} >
                        <p style={{ fontSize: "26px", marginBottom: "5px" }}>Obervação de Venda</p>
                        <textarea style={{ width: "100%", height: "250px", padding: "15px 15px" }} placeholder="Observações" />
                    </div>
                    <div style={{ padding: "20px 25px", width: "50%", display: "flex", "align-items": "center", "justify-content": "center", "flex-direction": "column" }}  >

                        <p style={{ marginBottom: "10px", fontSize: "26px" }}>Valor Total: R$ {this.state.pagamento.precoTotal}</p>
                        <div>
                            <Link style={{ display: "contents" }} to="/Vendas"> <button
                                style={{ cursor: "pointer", padding: "10px 15px", borderRadius: "10px", fontWeight: "bold", border: "1px solid black", marginRight: "10px" }}
                                type="button" >Cancelar</button> </Link>

                            <button type="button"
                                style={{ cursor: "pointer", padding: "10px 15px", borderRadius: "10px", fontWeight: "bold", border: "1px solid black" }}
                                onClick={() => { this.setState({ clickViewPagamento: true }) }} >Proximo</button>
                        </div>

                    </div>
                </div>

                <RegisterClient closeViewFunction={this.closeViewNewClient.bind(this)} viewNewClient={this.state.viewNewClient} updateClients={this.updateClients.bind(this)} ></RegisterClient>
                 
                <Pagamento view={this.state.clickViewPagamento} pagamento={this.state.pagamento} cliente={this.state.cliente} itens={this.state.itens} changeViewClick={this.changeViewClick.bind(this)} />

            </>
        );
    }
}

export default index;