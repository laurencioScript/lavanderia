import React, { Component } from 'react';
import {Link} from 'react-router-dom';
    
import Header from '../public/header';
import './report.css';

import icon_relatorio from '../public/icons/icon_relatorio.png';
import icon_rel_$ from '../public/icons/icon_rel_$.png';
import icon_rel_peca from '../public/icons/icon_rel_peças.png';

class index extends Component{
    state={
        reportType: "vazio"
    }
    switchBtn(reportType){
        var valor = reportType == this.state.reportType ? null : reportType;
        this.setState({reportType: valor});

        
        if(this.state.reportType === null)
            document.getElementById("btn-gerar-relatorio").disabled = true;
        else
            document.getElementById("btn-gerar-relatorio").disabled = false;

        // console.log(this.state.reportType + "   " + document.getElementById("btn-gerar-relatorio").disabled);
        }
    render(){
        return(
            <>
            <Header name="Relatórios" />
            <Link to="/menu">
                <div id="volta">
                    <p>↪ Voltar</p>
                </div>
            </Link>
            <div id="icon-page">
                <img src={icon_relatorio} alt=" "></img>
            </div>

            <div id="report-content">
                <div id="report-option">
                    <div id="report-btn1" onClick={() => {
                        this.switchBtn("#report-btn1");
                        // document.querySelector("#report-btn1").style.backgroundColor = "silver";
                        document.querySelector("#report-btn2").style.backgroundColor = null;
                        document.querySelector("#report-btn1").style.backgroundColor = this.state.reportType == "#report-btn1" ? null : "silver";
                    }}>
                        <img src={icon_rel_$} alt=" " />
                        <p>Movimento</p>
                    </div>
                    <div id="report-btn2" onClick={() => {
                        this.switchBtn("#report-btn2");
                        // document.querySelector("#report-btn2").style.backgroundColor = "silver";
                        document.querySelector("#report-btn1").style.backgroundColor = null;
                        document.querySelector("#report-btn2").style.backgroundColor = this.state.reportType == "#report-btn2" ? null : "silver";
                    }}>
                        <img src={icon_rel_peca} alt=" " />
                        <p>Peças Recebidas</p>
                    </div>
                </div>

                <div id="report-format">
                    <p>Período</p>
                    <div id="report-date">
                        <input type="date" />
                        <p> a </p>
                        <input type="date" />
                    </div>
                    <p>Formato</p>
                    <select>
                        <option value={null}>---</option>
                        <option value="PDF">PDF</option>
                        <option value="Excel">Excel</option>
                    </select>
                    <input type="button" value="Gerar" id="btn-gerar-relatorio" disabled />
                </div>
            </div>
            
            </>
        )
    }
}

export default index