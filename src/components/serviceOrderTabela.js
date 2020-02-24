import React, { Component, useState,useEffect,useCallback } from 'react';
import Axios from 'axios';
import SerOrdService from './../service/SerOrdService';
import Moment from 'react-moment';

function OsResumeTable() {

    const [vendas, setVendas] = useState([]);
    
    const AtualizarVendas = useCallback(() => { 
        return SerOrdService.buscarVendas() 
    }, [] );
    
    useEffect(()=>{
        AtualizarVendas().then(result => {
            setVendas(result)
        });
    },[AtualizarVendas])

    // não estava esperando buscar no banco
    const carregaVendas = ()=>{
        
        if(!vendas){
            return <></>
        }
        
        return vendas.map(venda =>
            <tr key={venda.id_service} id={venda.id_service}>

                <td id="OS-rol">{"01"}</td>
                <td id="OS-cliente">{venda.client.nome}</td>
                <td id="OS-telefone">{venda.client.contato}</td>
                <td id="OS-dtEntrada">
                    <Moment format="DD/MM/YYYY HH:mm" parse="YYYY-MM-DD HH:mm">
                        {venda.date_input}
                    </Moment>
                </td>
                <td id="OS-dtEntrega">
                    <Moment format="DD/MM/YYYY HH:mm" parse="YYYY-MM-DD HH:mm">
                        {venda.date_ouput}
                    </Moment>
                </td>
                <td id="OS-vlTotal">{venda.payment.value_total}</td>
                <td id="OS-situa">
                    {venda.situation}
                </td>
                <td id="OS-vlPago">{venda.payment.amount_paid}</td>
                <td id="OS-dtPaga">
                    { venda.date_payment? <Moment format="DD/MM/YYYY HH:mm" parse="YYYY-MM-DD HH:mm"> {venda.date_payment} </Moment> : "Falta Pagar" }
                </td>
            </tr>
        )
    }


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
                <p>Total de Vendas: {vendas? vendas.length : 0 }</p>
            </div>
        </>
    )

}

export default OsResumeTable;