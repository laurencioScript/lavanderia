import React, { Component } from 'react';

import './receber.css';

import icon_percentage from '../../public/icons/icon_percentage.png';
import icon_cheque from '../../public/icons/icon_cheque.png';
import icon_debit from '../../public/icons/icon_debit-card.png';
import icon_money from '../../public/icons/icon_money.png';
import icon_credit from '../../public/icons/icon_credit-card.png';


class Receber extends Component {
    render() {
        return (
            <div id="osReceberContainer">
                <p id='fecha' onClick={ () => {
                    document.getElementById("osReceberContainer").style.display = "none";
                }}>X</p>

                <div id="osReceberContent">

                    <div id="osReceberOne">
                        <div>
                            <p>ENTREGA</p>
                            <select>
                                <option>Cliente</option>
                                <option>Aberto</option>
                                <option>Pago</option>
                                <option>Retirado</option>
                                <option>Não Retirado</option>
                                <option>Cancelado</option>
                            </select>
                        </div>
                        <div>   
                            <p>RECEBIMENTO</p>
                            <select>
                                <option>Pago</option>
                                <option>Não Pago</option>
                            </select>
                        </div>
                    </div>

                    <div id="osReceberTwo">
                        <div><img src={icon_percentage}/> DESCONTO</div>
                        <div><input  
                                type="number" 
                                id="osPercentNumber"
                                min='1'
                                max='100'
                                onClick={() => {
                                    
                                }}/> 
                                <p>   % {}</p></div>
                        <p>Juros</p>
                        <div><input  
                                type="number" 
                                id="osPercentNumber"
                                min='1'
                                max='100'/> <p>   % {}</p></div>
                    </div>

                    <div id="osReceberThree">
                    <p>FORMA DE PAGAMENTO</p>
                    <div id="osReceivePaymentCheck">
                        <img src={icon_cheque}/>
                        <input type="checkBox" />
                        <p>CHEQUE</p>
                        <input type="text" disabled/>
                    </div>
                    <div id="osReceivePaymentDebt">
                        <img src={icon_credit} />
                        <input type="checkBox" />
                        <p>CARTÃO CRÉDITO</p>
                        <input type="text" disabled/>
                    </div>
                    <div id="osReceivePaymentCredit">
                        <img src={icon_debit} />
                        <input type="checkBox" />
                        <p>CARTÃO DÉBITO</p>
                        <input type="text" disabled/>
                    </div>
                    <div id="osReceivePaymentMoney">
                        <img src={icon_money} />
                        <input type="checkBox" />
                        <p>DINHEIRO</p>
                        <input type="text" disabled/>
                    </div>
                </div>
                </div>

                <input type="button" value="SALVAR"/>
            </div>
        );
    }
}

export default Receber;