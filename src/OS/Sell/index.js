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
    state={
        clientes: [],

        OptionCliente: [],
        SelectedOption: null,
    }
    componentDidMount(){
        Axios.get('http://localhost:3000/user').then(res =>{
            var clientes = res.data.result[0];

            this.setState({clientes});
            this.montaOption();
        });

        document.querySelector("#sell-DateSell").value = this.pegaData();
    }
    handleChange = SelectedOption =>{
        this.setState({SelectedOption}, () => console.log("Optin Selected: ", this.state.SelectedOption));
    }
    montaOption(){
        var OptionCliente = [];

        this.state.clientes.map(Cliente =>{
            OptionCliente.push({value: Cliente.id_usuario, label: Cliente.nome});
        });

        this.setState({OptionCliente});
    }

    pegaData(){
        var date = new Date();

        return date.getFullYear() + "-" + date.getMonth() +"-" +date.getDate();
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
                
                <Selltable />

                <div id="RVfinal">
                    
                        <div id="RVobservacao">
                            <p>Obervação de Venda</p>
                            <textarea placeholder="Observações"/>
                        </div>
                        <div id="RVfinalizar">
                            <p id="ValorTotal">Valor Total: R$ </p>
    
                            <input type="button" value="Pagamento"onClick={()=>{
                                document.querySelector("#osPagamentoContainer").style.display = "flex";
                            }}/>
                            
                            <input type="button" value="Finalizar"/>
                            
                        </div>
                </div>

                <CADcliente />
                <Pagamento />

            </>
        );
    }
}

export default index;