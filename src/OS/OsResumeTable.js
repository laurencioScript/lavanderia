import React, { Component } from 'react';
import Axios from 'axios';

class OsResumeTable extends Component{
    state={
        OS: []

    }
    componentDidMount(){
        // Axios.get('http://localhost:3000').then(res =>{
        //     var OS = res.data.result[0];
        //     this.setState({OS});
        // });

        this.setState({OS: [{
            "data_entrada":"2019-11-08 9:30:00",
            "data_entrega":"2019-11-15 9:30:00",
            "data_pagamento":"1800-01-01 00:00:00",
            "data_retirada":"1800-01-01 00:00:00",
            "observacao":"o cliente é muito gato",
            "situacao":"Falta pagar/falta entregar",
            "pagamento":{
                
                "cartao_debito":0,
                "cartao_credito":0,
                "cheque":0,
                "dinheiro":50.0,
                "desconto":0,
                "valor_pago":0,
                "valor_total":0
            },
            
            "cliente":{
                "nome":"Felipe Oliveira Mummy Silveira",
                "cpf_cnpj":"345.321.456-12",
                "contato":["13 -9881535-5821"],
                "tipo":"fisica",
                "email":"felipe@gmail.com"
            },
            
            "items":[
                {
                    "quantidade":"2",
                    "unidade":"unidade",
                    "valor_unitario":13.50,
                    "valor_total":27.00,
                    "peca":"camisa",
                    "cores":{"cores":["azul"]},
                    "defeitos":{"defeitos":["rasgada"]},
                    "caracteristicas":{"caracteristicas":["listrada"]}
                }
            ]                
        },{
            "data_entrada":"2019-11-08 9:30:00",
            "data_entrega":"2019-11-15 9:30:00",
            "data_pagamento":"1800-01-01 00:00:00",
            "data_retirada":"1800-01-01 00:00:00",
            "observacao":"o cliente é muito gato",
            "situacao":"Pago/falta entregar",
            "pagamento":{
                
                "cartao_debito":0,
                "cartao_credito":0,
                "cheque":0,
                "dinheiro":50.0,
                "desconto":0,
                "valor_pago":0,
                "valor_total":0
            },
            
            "cliente":{
                "nome":"Felipe Oliveira Mummy Silveira",
                "cpf_cnpj":"345.321.456-12",
                "contato":["13 -9881535-5821"],
                "tipo":"fisica",
                "email":"felipe@gmail.com"
            },
            
            "items":[
                {
                    "quantidade":"2",
                    "unidade":"unidade",
                    "valor_unitario":13.50,
                    "valor_total":27.00,
                    "peca":"camisa",
                    "cores":{"cores":["azul"]},
                    "defeitos":{"defeitos":["rasgada"]},
                    "caracteristicas":{"caracteristicas":["listrada"]}
                }
            ]                
        }]});
    }

    // componentDidUpdate(){
    //     Axios.get('http://localhost:3000').then(res =>{
    //         var OS = res.data.result[0];
    //         this.setState({OS});
    //     });
    // }

    situaCor(situa){
        var cores = [
            {situacao: "Falta pagar/falta entregar", color: "#e21517"},
            {situacao: "Pago", color: "#54789a"},
            {situacao: "Pago/retirado", color: "#59aa41"},
            {situacao: "Aberto", color: "initial"},
            {situacao: "Pago/falta entregar", color: "#47a2f4"},
        ];

        var retorno = cores.find(element => element.situacao == situa);
        
        return retorno.color;
    }

    render(){
        return(
            <>
            <table>
                <thead>
                    <tr>
                        <td>ROL</td>
                        <td>Cliente</td>
                        <td>Telefone</td>
                        <td>Data de Entrada</td>
                        <td>Data de Entrega</td>
                        <td>Valor Total</td>
                        <td>Situação</td>
                        <td>Valor Pago</td>
                        <td>Data Pagto</td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.OS.map(Vendas =>
                        <tr 
                            id="01"
                        >
                            <td id="OS-rol">{"01"}</td>
                            <td id="OS-cliente">{Vendas.cliente.nome}</td>
                            <td id="OS-telefone">{Vendas.cliente.contato[0]}</td>
                            <td id="OS-dtEntrada">{Vendas.data_entrada}</td>
                            <td id="OS-dtEntrega">{Vendas.data_entrega}</td>
                            <td id="OS-vlTotal">{Vendas.pagamento.valor_total}</td>
                            <td id="OS-situa" 
                                style={{backgroundColor: this.situaCor(Vendas.situacao)}}
                            >
                                {Vendas.situacao}
                            </td>
                            <td id="OS-vlPago">{Vendas.pagamento.valor_pago}</td>
                            <td id="OS-dtPaga">{Vendas.data_pagamento}</td>
                        </tr>   
                    )}
                </tbody>
            </table>

            <div id="qtd_vendas">
                <p>Total de Vendas: {this.state.OS.length}</p>
            </div>
            </>
        )
    }
}

export default OsResumeTable;