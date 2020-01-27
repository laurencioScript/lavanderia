import React, { Component } from 'react';

import './Pagamento.css';

import icon_percentage from '../public/icons/icon_percentage.png';
import icon_cheque from '../public/icons/icon_cheque.png';
import icon_debit from '../public/icons/icon_debit-card.png';
import icon_money from '../public/icons/icon_money.png';
import icon_credit from '../public/icons/icon_credit-card.png';

class Pagamento extends Component {
    render() {
        return (
            <div id="osPagamentoContainer">
                <p id="fecha" onClick={() => {document.getElementById('osPagamentoContainer').style.display = "none";}}>X</p>

                <p className="ValorTotal">Valor Total: R$ </p>

                <div id="osPagamentoContent">
                    <div id="osPagamentoContentOne">
                        <p>FORMA DE PAGAMENTO</p>
                        <div id="osPagamentoPaymentCheck">
                            <img src={icon_cheque}/>
                            <input type="checkBox" />
                            <p>CHEQUE = R${}</p>
                        </div>
                        <div id="osPagamentoPaymentDebt">
                            <img src={icon_credit} />
                            <input type="checkBox" />
                            <p>CARTÃO CRÉDITO = R${}</p>
                        </div>
                        <div id="osPagamentoPaymentCredit">
                            <img src={icon_debit} />
                            <input type="checkBox" />
                            <p>CARTÃO DÉBITO = R${}</p>
                        </div>
                        <div id="osPagamentoPaymentMoney">
                            <img src={icon_money} />
                            <input type="checkBox" />
                            <p>DINHEIRO = R${}</p>
                        </div>
                    </div>

                    <div id="osPagamentoContentTwo">
                    <div>
                        <img src={icon_percentage} />
                        <p>Desconto</p>
                        <input  
                                type="number" 
                                id="osPercentNumber"
                                min='1'
                                max='100'/>
                        <p>= {}</p>
                    </div>
                    
                    
                    <div>
                        <p>Valor a Receber: R${}</p>
                        <p>Total Pago: R${}</p>
                    </div>


                </div>
                
                </div>

                <p>Pago em: {}</p>
                
            </div>
        );
    }
}

export default Pagamento;