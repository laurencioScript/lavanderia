import React, { Component } from 'react';
import Axios from 'axios';

class OsResumeTable extends Component{
    state={
        OS: []

    }
    componentDidMount(){
        Axios.get('http://localhost:3000/service', {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}}).then(res =>{
            var OS = res.data.result;
            console.log(OS);
            this.setState({OS});
        });
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
    limpaLista = () =>{
        var tabela = document.getElementById("corpo_tabela");
        var linhas = tabela.getElementsByTagName("tr");

        for(var i = 0; i < linhas.length; i++){
            var a = linhas[i];
            a.classList.remove("selecionado");
        }
    }
    verificaLista = (linha) =>{
        this.limpaLista();
        // linha.classList.toggle("selecionado");
        try{
            document.getElementById(sessionStorage.getItem("Selecionado")).classList.toggle("selecionado");
        }catch(e){
        }
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
                <tbody id='corpo_tabela'>
                    {this.state.OS.map(Vendas =>
                        <tr 
                            id={Vendas.id_service}
                            onClick={() => {
                                sessionStorage.setItem("Selecionado", localStorage.getItem("Selecionado") == Vendas.id_service ? null : Vendas.id_service);
                                this.verificaLista(document.getElementById(Vendas.id_service)); 
                        }}>

                            <td id="OS-rol">{"01"}</td>
                            <td id="OS-cliente">{Vendas.client.nome}</td>
                            <td id="OS-telefone">{Vendas.client.contato}</td>
                            <td id="OS-dtEntrada">{Vendas.date_input}</td>
                            <td id="OS-dtEntrega">{Vendas.date_ouput}</td>
                            <td id="OS-vlTotal">{Vendas.payment.value_total}</td>
                            <td id="OS-situa" 
                                style={{backgroundColor: this.situaCor(Vendas.situation)}}
                            >
                                {Vendas.situation}
                            </td>
                            <td id="OS-vlPago">{Vendas.payment.amount_paid}</td>
                            <td id="OS-dtPaga">{Vendas.date_payment}</td>
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