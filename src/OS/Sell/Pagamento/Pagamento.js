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
    state = {
        precoTotal: this.props.precoTotal,
        precoPagar: 0,
        pago: 0,
        troco: 0,
        valorDesconto: 0,

            cheque: 0,
            credito: 0,
            debito: 0,
            dinheiro: 0,
            desconto: 0
    }
    componentDidUpdate(){
        var desconto = parseFloat(document.querySelector('#porcentoDesconto').value.replace(/[%]+/g,''));
        // this.setState({valorDesconto: this.props.precoTotal * (desconto/100)})
        document.querySelector('#valorDesconto').value = "R$ " + this.props.precoTotal * (desconto / 100);           
    }
    
    atualizaTotal = (val) =>{
        this.setState({precoTotal: val});
    }

    atualizaPago(){
        this.setState({pago: this.state.debito + this.state.credito + this.state.cheque + this.state.dinheiro } ,
            ()=>{this.setState({troco: this.state.pago - this.props.precoTotal,
                                precoPagar: (this.props.precoTotal - this.state.valorDesconto)}, ()=>{console.log("TROCO: " + this.state.troco)}  )});
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
                                onChange={(e)=>{
                                    this.setState({cheque: parseFloat(e.target.value.replace(/[R$ ]+/g,'').replace(/[.]+/g,'').replace(/[,]+/g,'.'))}, 
                                        ()=>{
                                            this.atualizaPago()
                                        })
                                    
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
                                onChange={(e)=>{
                                    this.setState({credito: parseFloat(e.target.value.replace(/[R$ ]+/g,'').replace(/[.]+/g,'').replace(/[,]+/g,'.'))}, 
                                        ()=>{
                                            this.atualizaPago()
                                        })
                                    
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
                                onChange={(e)=>{
                                    this.setState({debito: parseFloat(e.target.value.replace(/[R$ ]+/g,'').replace(/[.]+/g,'').replace(/[,]+/g,'.'))}, 
                                        ()=>{
                                            this.atualizaPago()
                                        })
                                    
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
                                onChange={(e)=>{
                                    this.setState({dinheiro: parseFloat(e.target.value.replace(/[R$ ]+/g,'').replace(/[.]+/g,'').replace(/[,]+/g,'.'))}, 
                                        ()=>{
                                            this.atualizaPago()
                                        })
                                    
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

                                    this.setDesconto(this.props.precoTotal * (desconto / 100));
                                    this.atualizaPago();
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
                        <p>Valor a Receber: R$ {isNaN(this.state.precoPagar) ? 0 : this.state.precoPagar}</p>
                        <p>Total Pago: R${isNaN(this.state.pago) ? 0 : this.state.pago}</p>
                        <p>Troco: R${this.state.troco < 0 || isNaN(this.state.troco) ? 0 : this.state.troco}</p>
                    </div>


                </div>
                
                </div>

                <input 
                    type="button"
                    value="SALVAR"
                    onClick={ () =>{
                            var pagamento = {
                                debito: this.state.debito,
                                credito: this.state.credito,
                                cheque: this.state.cheque,
                                dinheiro: this.state.dinheiro,
                                desconto: this.state.desconto,
                                totalPago: this.state.pago,
                                precoTotal: this.state.precoTotal
                            };
                            console.log("PROP PRECO: " + this.props.precoTotal)
                            this.props.mudaPagamento(pagamento);
                    }}
                />
                
            </div>
        );
    }
}

export default Pagamento;