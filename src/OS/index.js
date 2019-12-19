import React, { Component } from 'react';

import Header from '../public/header';

import icon_lista from '../public/icons/icon_lista.png';
import OsResumeTable from './OsResumeTable';

import './OS.css';
import { Link } from 'react-router-dom';
import Receber from './Receber';

class index extends Component{
    render(){
        return(
            <>
                <Header name="Resumo de Vendas" />

                <div id="volta">
                    <p>↪ Voltar</p>
                </div>

                <div id="icon-page">
                    {/* CARROUSEL */}
                    <img src={icon_lista} alt=" "></img>
                </div>

                <div id="content-OSresume">
                    <div id="primeira-parte">
                        <select>
                            <option>Cliente</option>
                            <option>Aberto</option>
                            <option>Pago</option>
                            <option>Retirado</option>
                            <option>Não Retirado</option>
                            <option>Cancelado</option>
                        </select>

                        <input type="date" className="date" /> <p>a</p> <input type="date" className="date"/> 
                            
                        <input type="button" value="Pesquisar 🔍" id="btn-pesquisar"/>
                    </div>

                    <div id="OS_buttons">
                        <input type="button" value="RECEBER" id="btn-osReceber"/>
                        <input type="button" value="PAGAMENTO $" id="btn-osPagamento"/>
                    </div>
                </div>

                <OsResumeTable />

                <Link to="/menu">
                    <input 
                        type="button"
                        value="REALIZAR VENDA"
                        id="osRealizarVenda"/>
                </Link>

                <Receber />
                
            </>
        )
    }
}

export default index;