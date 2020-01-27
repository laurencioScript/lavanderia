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
    requireDecimal: true,
});
const percentMask = createNumberMask({
    prefix: '',
    suffix: '%',
    allowDecimal: false
})

class Pagamento extends Component {
    constructor(props){
        super(props)

        this.state = {
            precoTotal: sessionStorage.getItem("precoTotal"),
            pago: 0,
            troco: 0,
            valorDesconto: 0,
            pagamento: {
                cheque: 0,
                credito: 0,
                debito: 0,
                dinheiro: 0,
                desconto: 0
            }
        }
    }

    componentDidUpdate(){
        var desconto = parseFloat(document.querySelector('#porcentoDesconto').value.replace(/[%]+/g,''));
        // this.setState({valorDesconto: this.props.precoTotal * (desconto/100)})
        document.querySelector('#valorDesconto').value = "R$ " + this.props.precoTotal * (desconto / 100);
           
    }
    
    chamaPreco(){
        // setInterval(()=>{
        //     console.log(sessionStorage.getItem('precoTotal'))
        //     document.querySelector('#ValorTotalPagamento').value = 'Valor Total: R$ ' + sessionStorage.getItem('precoTotal');
        // }, 500)
        
    }
    atualizaPago(){
        this.setState({pago: 
            isNaN(this.state.pagamento.debito ) ? 0 : this.state.pagamento.debito +
            isNaN(this.state.pagamento.credito) ? 0 : this.state.pagamento.credito +
            isNaN(this.state.pagamento.cheque) ? 0 : this.state.pagamento.cheque +
            isNaN(this.state.pagamento.dinheiro) ? 0 : this.state.pagamento.dinheiro +
            isNaN(this.state.pagamento.desconto) ? 0 : this.state.pagamento.desconto })
    }
    setDesconto(valorDesconto)
    {
        this.setState({valorDesconto},()=> {console.log(this.state.valorDesconto)});
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
                                    // this.setState({pagamento: {cheque: parseFloat(document.querySelector("#pagoCheque").value.replace(/[R$ ]+/g,'').replace(/[.]+/g,'').replace(/[,]+/g,'.'))}});
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
                                    // this.setState({pagamento: {credito: parseFloat(document.querySelector("#pagoCredito").value.replace(/[R$ ]+/g,'').replace(/[.]+/g,'').replace(/[,]+/g,'.'))}});
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
                                    // console.log(parseFloat(document.querySelector("#pagoDebito").value.replace(/[R$ ]+/g,'').replace(/[.]+/g,'').replace(/[,]+/g,'.')));
                                    // this.setState({pagamento: {debito: parseFloat(document.querySelector("#pagoDebito").value.replace(/[R$ ]+/g,'').replace(/[.]+/g,'').replace(/[,]+/g,'.'))}});
                                    // console.log("state: " + this.state.pagamento.debito)
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
                                    // this.setState({pagamento: {dinheiro: parseFloat(document.querySelector("#pagoDinhe").value.replace(/[R$ ]+/g,'').replace(/[.]+/g,'').replace(/[,]+/g,'.'))}});
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
                                id="porcentoDesconto"
                                mask={percentMask}
                                placeholder="% Desconto %"
                                onChange={()=> {
                                    var desconto = parseFloat(document.querySelector('#porcentoDesconto').value.replace(/[%]+/g,''));
                                    document.querySelector('#valorDesconto').value = "R$ " + this.props.precoTotal * (desconto / 100);

                                    // this.setDesconto(this.props.precoTotal * (desconto / 100));
                                }}
                            />

                        <TextMask 
                            id="valorDesconto"
                            mask={amountMask}
                            placeholder="R$ 00,00"
                            // onChange=
                            // value={this.state.valorDesconto == null ? "0" : this.state.valorDesconto}
                        />
                    </div>
                    
                    
                    <div>
                        <p>Valor a Receber: R$ {this.props.precoTotal}</p>
                        <p>Total Pago: R${this.state.pago}</p>
                        <p>Troco: R${this.state.troco}</p>
                    </div>


                </div>
                
                </div>

                <input 
                    type="button"
                    value="SALVAR"
                    onClick={ () =>{
                        this.setState({
                            pagamento: {
                                debito: parseFloat(document.querySelector("#pagoDebito").value.replace(/[R$ ]+/g,'').replace(/[.]+/g,'').replace(/[,]+/g,'.')),
                                credito: parseFloat(document.querySelector("#pagoCredito").value.replace(/[R$ ]+/g,'').replace(/[.]+/g,'').replace(/[,]+/g,'.')),
                                cheque: parseFloat(document.querySelector("#pagoCheque").value.replace(/[R$ ]+/g,'').replace(/[.]+/g,'').replace(/[,]+/g,'.')),
                                dinheiro: parseFloat(document.querySelector("#pagoDinhe").value.replace(/[R$ ]+/g,'').replace(/[.]+/g,'').replace(/[,]+/g,'.')),
                                desconto: document.querySelector('#porcentoDesconto').value
                            }
                        }, ()=> { 
                            var pagamento = {
                                debito: isNaN(this.state.pagamento.debito ) ? 0 : this.state.pagamento.debito,
                                credito: isNaN(this.state.pagamento.credito) ? 0 : this.state.pagamento.credito,
                                cheque: isNaN(this.state.pagamento.cheque) ? 0 : this.state.pagamento.cheque,
                                dinheiro: isNaN(this.state.pagamento.dinheiro) ? 0 : this.state.pagamento.dinheiro,
                                desconto: isNaN(this.state.pagamento.desconto) ? 0 : this.state.pagamento.desconto,
                                totalPago: 0 
                            }
                            pagamento.totalPago = pagamento.debito + pagamento.credito + pagamento.cheque + pagamento.dinheiro;
                            this.setState({pago: pagamento.totalPago,
                                            troco: pagamento.dinheiro - this.props.precoTotal});
                            this.props.mudaPagamento(pagamento);
                        })
                    }}
                />
                
            </div>
        );
    }
}

export default Pagamento;