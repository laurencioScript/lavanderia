import React, { Component } from 'react';
import Select from 'react-select';
import Header from '../../public/header';

import icon_caixa from '../../public/icons/icon_caixa.png';
import Axios from 'axios';

import './Sell.css';
import Selltable from './Selltable';

class index extends Component {
    state={
        clientes: []
    }
    componentDidMount(){
        // Axios.get('http://localhost:3000/client').then(res =>{
        //     var clientes = res.data.result[0]    ;

        //     this.setState({clientes});
        // });



        document.querySelector("#sell-DateSell").value = this.pegaData();
        console.log(this.pegaData());

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
                        <Select options={[{value:"teste", label:"teste"},{value: "teste2", label:"teste2"}]} />

                        <p>OU</p>

                        <input type="button" value="Cadastrar"/>
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

            </>
        );
    }
}

export default index;