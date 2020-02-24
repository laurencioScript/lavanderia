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
import ServiceSell from './../service/SerOrdService';


class index extends Component {


    constructor(props) {
        super(props)
        this.state = {
            viewNewClient: false,
            optionsClientes: [],
            cliente: null,
            payment: {
                debit_card: 0,
                credit_card: 0,
                check_pay: 0,
                money_pay: 0,
                discount: 0,
                amount_paid: 0,
                value_total: 0
            },
            itens: [{
                amount: 1,
                unity: "",
                value_unity: 0,
                value_total: 0,
                piece: "",
                colors: [],
                defects: [],
                characteristics: []
            }],
            clickViewPagamento: false,
            date_input: "",
            date_ouput: "",
            date_payment: "",
            date_removed: "",
            observation: "",
            situation: "",
        }

        this.loadClients();
    }

    closeViewNewClient(value) { this.setState({ viewNewClient: value }); }

    selectCustomer = customer => { this.setState({ cliente: customer }); }

    formateDate = (data)=>{ return  new Date(data).toLocaleDateString().toString() +" "+ new Date(data).toLocaleTimeString()}

    changeViewClick() {
        this.setState({ clickViewPagamento: false });
    }

    updateItens(itens) {
        this.setState({ itens })
        console.log('Update Itens Screen ', itens);
        this.updateTotalCost()
    }

    updateTotalCost() {
        this.state.payment.value_total = 0;
        for (let item of this.state.itens) {
            this.state.payment.value_total += +item.value_total;
        }
        this.setState({
            payment: this.state.payment
        })
    }

    loadClients() {
        ServiceClient.getCustomers().then((clientes) => {
            let optionsClientes = []
            clientes.map(cliente => {
                optionsClientes.push({
                    value: {
                        nome: cliente.name_client,
                        cpf_cnpj: cliente.cpf_cnpj,
                        contato: cliente.contact,
                        tipo: cliente.type_client,
                        email: cliente.email
                    },
                    label: cliente.name_client
                });
            });
            this.setState({ optionsClientes });
        });

    }

    async saveToSell(payment) {
        this.setState({ payment });
        this.state.payment.discount = parseFloat(this.state.payment.discount || 0);

        // console.log('Vou chorar ',{
        //     date_input: this.formateDate(new Date()),
        //     date_ouput: this.formateDate(this.state.date_ouput) ,
        //     date_payment: this.state.payment.value_total == this.state.payment.amount_paid ? this.formateDate(new Date()): null,
        //     date_removed: null,
        //     observation: this.state.observation,
        //     situation: this.state.payment.value_total == this.state.payment.amount_paid ? "Pago/Não Retirado":"Não Pago/Não Retirado",
        //     client: this.state.cliente.value,
        //     payment: this.state.payment,
        //     itens: this.state.itens
        // })

        return await ServiceSell.realizarVendas({
            date_input: this.formateDate(new Date()),
            date_ouput: this.formateDate(this.state.date_ouput),
            date_payment: this.state.payment.value_total == this.state.payment.amount_paid ?  this.formateDate(new Date()): null,
            date_removed: null,
            observation: this.state.observation,
            situation: this.state.payment.value_total == this.state.payment.amount_paid ? "Pago/Não Retirado":"Não Pago/Não Retirado",
            client: this.state.cliente.value,
            payment: this.state.payment,
            itens: this.state.itens
        })
    }


    updateClients() {
        this.loadClients();
    }

    render() {

        return (
            <>
                <Header name="REALIZAR VENDA" />

                <Link id="btnVoltar" to="/Vendas"> <button type="button" >Voltar</button> </Link>
                <div id="icon-page"> <img src={icon_caixa} alt=" "></img> </div>

                <div style={{ display: "flex", padding: "0px 100px", justifyContent: "space-around" }}>

                    <div style={{ display: "flex", flexDirection: "column", width: "500px" }}>
                        <Select options={this.state.optionsClientes} onChange={this.selectCustomer} value={this.state.cliente} />
                    </div>

                    <button type="button" onClick={() => { this.setState({ viewNewClient: true }) }} style={{ padding: "0px 15px" }}>+</button>

                    <div style={{}}>
                        <p>Data de Pagamento</p>
                        <input type="date" onChange={(e) => { this.setState({ date_payment: e.target.value }) }} className="date" />
                    </div>

                    <div style={{}}>
                        <p>Data de Entrega</p>
                        <input type="date" onChange={(e) => { this.setState({ date_ouput: e.target.value }) }} className="date" />
                    </div>
                </div>

                <Selltable updateItens={this.updateItens.bind(this)} mudaPreco={this.mudaPreco} />

                <div style={{ display: "flex", "justifyContent": "spaceBetween" }}>

                    <div style={{ width: "50%", padding: "20px 25px" }} >
                        <p style={{ fontSize: "26px", marginBottom: "5px" }}>Obervação de Venda</p>
                        <textarea style={{ width: "100%", height: "250px", padding: "15px 15px" }} onChange={(e) => { this.setState({ observation: e.target.value }) }} placeholder="Observações" />
                    </div>
                    <div style={{ padding: "20px 25px", width: "50%", display: "flex", "alignItems": "center", "justifyContent": "center", "flexDirection": "column" }}  >

                        <p style={{ marginBottom: "10px", fontSize: "26px" }}>Valor Total: R$ {this.state.payment.value_total}</p>
                        <div>
                            <Link style={{ display: "contents" }} to="/Vendas"> <button
                                style={{ cursor: "pointer", padding: "10px 15px", borderRadius: "10px", fontWeight: "bold", border: "1px solid black", marginRight: "10px" }}
                                type="button" >Cancelar</button> </Link>

                            <button type="button"
                                style={{ cursor: "pointer", padding: "10px 15px", borderRadius: "10px", fontWeight: "bold", border: "1px solid black" }}
                                onClick={() => { console.log(this.state); this.setState({ clickViewPagamento: true }) }} >Proximo</button>
                        </div>

                    </div>
                </div>

                <RegisterClient closeViewFunction={this.closeViewNewClient.bind(this)} viewNewClient={this.state.viewNewClient} updateClients={this.updateClients.bind(this)} ></RegisterClient>

                <Pagamento view={this.state.clickViewPagamento} pagamento={this.state.payment} saveToSell={this.saveToSell.bind(this)} changeViewClick={this.changeViewClick.bind(this)} />

            </>
        );
    }
}

export default index;