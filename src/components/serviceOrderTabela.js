import React, { Component, useState,useEffect } from 'react';
import Axios from 'axios';
import SerOrdService from './../service/SerOrdService';
import Moment from 'react-moment';

function OsResumeTable() {

    const [vendas, setVendas] = useState([]);

    useEffect(() => {
        const AtualizarVendas = async () => {
            setVendas(await SerOrdService.buscarVendas());
        }
        
        AtualizarVendas();
    }, [])

    // não estava esperando buscar no banco
    const carregaVendas = ()=>{
        
        if(vendas && vendas.length < 1){
            return
        }
        
        return vendas.map(venda =>
            <tr key={venda.id_service} id={venda.id_service}>

                <td id="OS-rol">{"01"}</td>
                <td id="OS-cliente">{venda.client.nome}</td>
                <td id="OS-telefone">{venda.client.contato}</td>
                <td id="OS-dtEntrada">
                    <Moment format="DD/MM/YYYY HH:mm" parse="DD-MM-YYYY HH:mm">
                        {venda.date_input}
                    </Moment>
                </td>
                <td id="OS-dtEntrega">
                    <Moment format="DD/MM/YYYY HH:mm" parse="DD-MM-YYYY HH:mm">
                        {venda.date_ouput}
                    </Moment>
                </td>
                <td id="OS-vlTotal">{venda.payment.value_total}</td>
                <td id="OS-situa">
                    {venda.situation}
                </td>
                <td id="OS-vlPago">{venda.payment.amount_paid}</td>
                <td id="OS-dtPaga">
                    <Moment format="DD/MM/YYYY HH:mm" parse="DD-MM-YYYY HH:mm">
                        {venda.date_payment}
                    </Moment>
                </td>
            </tr>
        )
    }
    

    // componentDidMount(){
    //     Axios.get('http://localhost:3000/service', {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}}).then(res =>{
    //         var OS = res.data.result;
    //         console.log(OS);
    //         this.setState({OS});
    //     });
    // }

    // componentDidUpdate(){
    //     Axios.get('http://localhost:3000').then(res =>{
    //         var OS = res.data.result[0];
    //         this.setState({OS});
    //     });
    // }

    // const limpaLista = () =>{
    //     var tabela = document.getElementById("corpo_tabela");
    //     var linhas = tabela.getElementsByTagName("tr");

    //     for(var i = 0; i < linhas.length; i++){
    //         var a = linhas[i];
    //         a.classList.remove("selecionado");
    //     }
    // }

    // const verificaLista = (linha) =>{
    //     limpaLista();
    //     // linha.classList.toggle("selecionado");
    //     try{
    //         document.getElementById(sessionStorage.getItem("Selecionado")).classList.toggle("selecionado");
    //     }catch(e){
    //     }
    // }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td>ROL</td>
                        <td>Cliente</td>
                        <td>Contato</td>
                        <td>Entrada</td>
                        <td>Entrega</td>
                        <td>Valor Total</td>
                        <td>Situação</td>
                        <td>Valor Pago</td>
                        <td>Data Pagto</td>
                    </tr>
                </thead>
                <tbody id='corpo_tabela'>
                    {
                        carregaVendas()                        
                    }
                </tbody>
            </table>

            <div id="qtd_vendas">
                <p>Total de Vendas: {vendas.length}</p>
            </div>
        </>
    )

}

export default OsResumeTable;