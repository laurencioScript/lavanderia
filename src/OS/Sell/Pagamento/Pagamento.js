import React, { Component } from 'react';

import './Pagamento.css';

import icon_percentage from '../../../public/icons/icon_percentage.png';
import icon_cheque from '../../../public/icons/icon_cheque.png';
import icon_debit from '../../../public/icons/icon_debit-card.png';
import icon_money from '../../../public/icons/icon_money.png';
import icon_credit from '../../../public/icons/icon_credit-card.png';

class Pagamento extends Component {
    state = {
        precoTotal: sessionStorage.getItem("precoTotal"),
        pago: 0,
        pagamento: {
            cheque: 0,
            credito: 0,
            debito: 0,
            dinheiro: 0
        }
    }

    atualizaPago(){
        this.setState({pago: 
            this.state.pagamento.cheque != Float32Array ? 0 : this.state.pagamento.cheque  + 
            this.state.pagamento.credito != Float32Array ? 0 : this.state.pagamento.credito + 
            this.state.pagamento.debito != Float32Array ? 0 : this.state.pagamento.debito + 
            this.state.pagamento.dinheiro != Float32Array ? 0 : this.state.pagamento.dinheiro})
    }

    render() {
        return (
            <div id="RVpagamentoContainer">
                <p id="fecha" onClick={() => {document.getElementById('RVpagamentoContainer').style.display = "none";}}>X</p>

                <p className="ValorTotal">Valor Total: R$ {this.state.precoTotal} </p>

                <div id="RVpagamentoContent">
                    <div id="RVpagamentoContentOne">
                        <p>FORMA DE PAGAMENTO</p>
                        <div id="RVpagamentoPaymentCheck">
                            <img src={icon_cheque}/>
                            <input type="checkBox" />
                            <p>CHEQUE</p>
                            <input 
                                id="pagoCheque"
                                type="text"
                                placeholder="R$ 00,00"
                                onChange={()=>{
                                    this.setState({pagamento: {cheque: parseFloat(document.querySelector("#pagoCheque").value)}});
                                    this.atualizaPago()
                                }}
                            />
                        </div>
                        <div id="RVpagamentoPaymentCredit">
                            <img src={icon_credit} />
                            <input type="checkBox" />
                            <p>CARTÃO CRÉDITO</p>
                            <input 
                                id="pagoCredito"
                                type="text"
                                placeholder="R$ 00,00"
                                onChange={()=>{
                                    this.setState({pagamento: {credito: parseFloat(document.querySelector("#pagoCredito").value)}});
                                    this.atualizaPago()
                                }}
                            />
                        </div>
                        <div id="RVpagamentoPaymentDebt">
                            <img src={icon_debit} />
                            <input type="checkBox" />
                            <p>CARTÃO DÉBITO</p>
                            <input 
                                id="pagoDebito"
                                type="text"
                                placeholder="R$ 00,00"
                                onChange={()=>{
                                    this.setState({pagamento: {debito: parseFloat(document.querySelector("#pagoDebito").value)}});
                                    this.atualizaPago()
                                }}
                            />
                        </div>
                        <div id="RVpagamentoPaymentMoney">
                            <img src={icon_money} />
                            <input type="checkBox" />
                            <p>DINHEIRO</p>
                            <input 
                                id="pagoDinhe"
                                type="text"
                                placeholder="R$ 00,00"
                                onChange={()=>{
                                    this.setState({pagamento: {dinheiro: parseFloat(document.querySelector("#pagoDinhe").value)}});
                                    this.atualizaPago()
                                }}
                            />
                        </div>
                    </div>

                    <div id="RVpagamentoContentTwo">
                    <div>
                        <img src={icon_percentage} />
                        <p>Desconto</p>
                        <input  
                                type="number" 
                                id="RVPercentNumber"
                                min='1'
                                max='100'/>
                        <input 
                            type="text"
                            placeholder="R$ 00,00"
                        />
                    </div>
                    
                    
                    <div>
                        <p>Valor a Receber: R$ {sessionStorage.getItem("precoTotal")}</p>
                        <p>Total Pago: R${this.state.pago}</p>
                        <p>Troco: R${}</p>
                    </div>


                </div>
                
                </div>

                <input 
                    type="button"
                    value="SALVAR"
                />
                
            </div>
        );
    }
}

export default Pagamento;