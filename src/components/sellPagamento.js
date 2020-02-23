import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import TextMask from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';


import './sellPagamento.css';
import icon_percentage from './../public/icons/icon_percentage.png';
import icon_cheque from './../public/icons/icon_cheque.png';
import icon_debit from './../public/icons/icon_debit-card.png';
import icon_money from './../public/icons/icon_money.png';
import icon_credit from './../public/icons/icon_credit-card.png';

const amountMask = createNumberMask({
    prefix: 'R$ ',
    suffix: '',
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

function Pagamento(props) {
    
    const [precoTotal, setPrecoTotal] = useState(0);
    const [valorPago, setValorPago] = useState(0);
    const [troco, setTroco] = useState(0);
    const [valorDesconto, setValorDesconto] = useState(0);
    const [view, setView] = useState(false);
    const [cheque, setCheque] = useState(0);
    const [credito, setCredito] = useState(0);
    const [debito, setDebito] = useState(0);
    const [dinheiro, setDinheiro] = useState(0);
    const [desconto, setDesconto] = useState("");
    const [pagamento,setPagamento] = useState("");
    const [itens,setItens] = useState();
    const [cliente,setCliente] = useState();

    useEffect(()=>{
        setView(props.view);        
        setPrecoTotal(props.pagamento.precoTotal);
        setPagamento(props.pagamento);
        setCliente(props.cliente);
        setItens(props.itens);

    },[props])

    useEffect(()=>{
        let total = (+dinheiro)+(+debito)+(+credito)+(+cheque);
        typeof(total) == "number" ? setValorPago(total) : setValorPago(0);
        
    },[dinheiro,cheque,credito,debito]);

    useEffect(()=>{
        console.log('desconto = ',desconto);
        if(!desconto && desconto == 0){
            setPrecoTotal(pagamento.precoTotal)
        }else{
            setPrecoTotal(pagamento.precoTotal-desconto)
        }
    },[desconto])

    useEffect(()=>{
        console.log(valorPago,precoTotal);
        valorPago > precoTotal ?   setTroco((+valorPago)-precoTotal) : setTroco(0);
    },[valorPago])

    useEffect(()=>{
        typeof(dinheiro) == "string" ?   setDinheiro(parseFloat(dinheiro.replace(",","."))) :  setDinheiro(dinheiro); 
    },[dinheiro])

    useEffect(()=>{
        typeof(debito) == "string" ?   setDebito(parseFloat(debito.replace(",","."))) :  setDebito(debito);
    },[debito])

    useEffect(()=>{
        typeof(credito) == "string" ?   setCredito(parseFloat(credito.replace(",","."))) :  setCredito(credito);
    },[credito])

    useEffect(()=>{
        typeof(cheque) == "string" ?   setCheque(parseFloat(cheque.replace(",","."))) :  setCheque(cheque);
    },[cheque])

    
    const closeModal = () => {
        setView(false);
        props.changeViewClick();
    }

    const calculeDesconto = (descontoCal) => {
        return (precoTotal * (descontoCal / 100));
    }
   
    const valida = (e)=>{
        console.log("Valor = ",e);
        console.log('Parse ',parseFloat(e));
        if(!e)
            return 0;
        
        return parseFloat(e);
    }

    return (
            <div id="RVpagamentoContainer" style={view ? {display: 'flex'}:{display:'none'}} >
                <p id="fecha" onClick={() => { closeModal() }}>X</p>

                <p id='ValorTotalPagamento' className="ValorTotal">Valor Total: R$ {precoTotal}</p>

                <div id="RVpagamentoContent">
                    <div id="RVpagamentoContentOne">
                        <p>FORMA DE PAGAMENTO</p>
                        <div id="RVpagamentoPaymentCheck">
                            <img src={icon_cheque} />
                            <p>CHEQUE</p>
                            <input id='pagoCheque' placeholder="R$ 00,00" onChange={(e) => { setCheque(valida(e.target.value)) }} />
                        </div>
                        <div id="RVpagamentoPaymentCredit">
                            <img src={icon_credit} />
                            <p>CARTÃO CRÉDITO</p>
                            <input id='pagoCredito' placeholder="R$ 00,00" onChange={(e) => { setCredito(valida(e.target.value)) }} />
                        </div>
                        <div id="RVpagamentoPaymentDebt">
                            <img src={icon_debit} />
                            <p>CARTÃO DÉBITO</p>
                            <input id='pagoDebito' placeholder="R$ 00,00" onChange={(e) => { setDebito(valida(e.target.value)) }} />
                        </div>
                        <div id="RVpagamentoPaymentMoney">
                            <img src={icon_money} />
                            <p>DINHEIRO</p>
                            <input id='pagoDinhe' placeholder="R$ 00,00" onChange={(e) => { setDinheiro(valida(e.target.value))
                             }} />
                        </div>
                    </div>

                    <div id="RVpagamentoContentTwo">
                        <div> <img src={icon_percentage} /> <p>Desconto</p> </div>
                        <div  style={{display:"flex"}}>
                            <input style={{width:"50%"}} id="porcentoDesconto" mask={percentMask} placeholder="0%" onChange={(e) => { setDesconto(calculeDesconto(e.target.value)) }} />
                            <input style={{width:"50%"}}  id="valorDesconto" placeholder="R$ 00,00" onChange={(e) => { setDesconto(e.target.value) }} />      
                            </div>
                        <div>
                            <p hidden={ !(precoTotal > valorPago)  } >Valor a Receber: R$ {precoTotal-valorPago}</p>
                            <p>Total Pago: R${valorPago}</p>
                            <p hidden={ !(precoTotal < valorPago)  }>Troco: R${troco}</p>
                        </div>
                    </div>
                    
                </div>
                <Link style={{display: "contents"}} to="/Vendas"> <button 
                    style={{cursor:"pointer", padding:"10px 15px", borderRadius:"10px", fontWeight:"bold", border:"1px solid black",marginRight:"10px"}} 
                    type="button" >Finalizar</button> </Link> 

            </div>
    );

}

export default Pagamento;