import React, { Component } from 'react';
import TextMask from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import './Pagamento.css';

import icon_percentage from '../../../public/icons/icon_percentage.png';
import icon_cheque from '../../../public/icons/icon_cheque.png';
import icon_debit from '../../../public/icons/icon_debit-card.png';
import icon_money from '../../../public/icons/icon_money.png';
import icon_credit from '../../../public/icons/icon_credit-card.png';

const amountMask = createNumberMask({
    prefix:'R$ ',
    suffix:'',
    decimalSymbol: ',',
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalLimit: 2,
    requireDecimal: true
});
const percentMask = createNumberMask({
    prefix: '',
    suffix: '%',
    allowDecimal: false
})

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
    chamaPreco(){
        // setInterval(()=>{
        //     console.log(sessionStorage.getItem('precoTotal'))
        //     document.querySelector('#ValorTotalPagamento').value = 'Valor Total: R$ ' + sessionStorage.getItem('precoTotal');
        // }, 500)
    }
    atualizaPago(){
        this.setState({pago: 
            this.state.pagamento.cheque + 
            this.state.pagamento.credito + 
            this.state.pagamento.debito + 
            this.state.pagamento.dinheiro })
    }

    render() {
        return (
            <div id="RVpagamentoContainer">
                <p id="fecha" onClick={() => {document.getElementById('RVpagamentoContainer').style.display = "none";}}>X</p>

                <p id='ValorTotalPagamento' className="ValorTotal">Valor Total: R$ {this.props.precoTotal}</p>

                <div id="RVpagamentoContent">
                    <div id="RVpagamentoContentOne">
                        <p>FORMA DE PAGAMENTO</p>
                        <div id="RVpagamentoPaymentCheck">
                            <img src={icon_cheque}/>
                            <p>CHEQUE</p>
                            <TextMask 
                                id='pagoCheque'
                                mask={amountMask}
                                placeholder="R$ 00,00"
                                onChange={()=>{
                                    this.setState({pagamento: {cheque: parseFloat(document.querySelector("#pagoCheque").value.replace(/[R$ ]+/g,'').replace(/[.]+/g,'').replace(/[,]+/g,'.'))}});
                                    this.atualizaPago()
                                }}
                            />
                        </div>
                        <div id="RVpagamentoPaymentCredit">
                            <img src={icon_credit} />
                            <p>CARTÃO CRÉDITO</p>
                            <TextMask 
                                id='pagoCredito'
                                mask={amountMask}
                                placeholder="R$ 00,00"
                                onChange={()=>{
                                    this.setState({pagamento: {credito: parseFloat(document.querySelector("#pagoCredito").value.replace(/[R$ ]+/g,'').replace(/[.]+/g,'').replace(/[,]+/g,'.'))}});
                                    this.atualizaPago()
                                }}
                            />
                        </div>
                        <div id="RVpagamentoPaymentDebt">
                            <img src={icon_debit} />
                            <p>CARTÃO DÉBITO</p>
                            <TextMask 
                                id='pagoDebito'
                                mask={amountMask}
                                placeholder="R$ 00,00"
                                onChange={()=>{
                                    this.setState({pagamento: {debito: parseFloat(document.querySelector("#pagoDebito").value.replace(/[R$ ]+/g,'').replace(/[.]+/g,'').replace(/[,]+/g,'.'))}});
                                    this.atualizaPago()
                                }}
                            />
                        </div>
                        <div id="RVpagamentoPaymentMoney">
                            <img src={icon_money} />
                            <p>DINHEIRO</p>
                            <TextMask 
                                id='pagoDinhe'
                                mask={amountMask}
                                placeholder="R$ 00,00"
                                onChange={()=>{
                                    this.setState({pagamento: {dinheiro: parseFloat(document.querySelector("#pagoDinhe").value.replace(/[R$ ]+/g,'').replace(/[.]+/g,'').replace(/[,]+/g,'.'))}});
                                    this.atualizaPago();
                                }}
                            />
                        </div>
                    </div>

                    <div id="RVpagamentoContentTwo">
                    <div>
                        <img src={icon_percentage} />
                        <p>Desconto</p>
                        <TextMask 
                                mask={percentMask}
                                placeholder="% Desconto %"
                            />

                        <TextMask 
                            mask={amountMask}
                            placeholder="R$ 00,00"
                        />
                    </div>
                    
                    
                    <div>
                        <p>Valor a Receber: R$ {this.props.precoTotal}</p>
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