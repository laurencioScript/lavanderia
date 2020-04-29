import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { TextField, InputAdornment, MenuItem, makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton'

import './screenMenu.css';
import SideBar from './../public/sideBar';

import magnifyingGlassIcon from './../public/icons/magnifyingGlass.svg'
import dateIcon from './../public/icons/dateIcon.svg'
import payedIcon from './../public/icons/payed.svg'
import notPayedIcon from './../public/icons/notPayed.svg'
import shippedIcon from './../public/icons/shipped.svg'
import notShippedIcon from './../public/icons/notShipped.svg'

import bdConect from './../service/SerOrdService'

const sellSituations =
    [
        { value: "-----", label: "-----",},
        { value: "Aberto", label: "Aberto"},
        { value: "Pago", label: "Pago"},
        { value: "Retirado", label: "Retirado"},
        { value: "Não Retirado", label: "Não Retirado"},
        { value: "Cancelado", label: "Cancelado"},
    ];

const useStyles = makeStyles({
    table: {
        minWidth:650,
    },
});

function Menu(){
    const [vendas, setVendas] = useState([]);
    const [tableCell, setTableCell] = useState();
    const [loading, setLoading] = useState(true);
    const [firstLoading, setFirstLoading] = useState(false);
    const [selectedSituation, setSelectedSituation] = useState("-----");
    const classes = useStyles();

    useEffect(()=>{
        
        if(!firstLoading){
            setTableCell(changeLoadingCell());


            bdConect.buscarVendas().then(res => { 
                setVendas(res);
                setLoading(false)
            });

            console.log("entrei no if");
            // setVendas(chamaBanco());
            setFirstLoading(true);
        }else{}
        
    });

    useEffect(()=>{
        if(!loading){
            setTableCell(changeLoadingCell());
            setLoading(true)
        }
    });

    const formatDate = (date) =>{
        let day = new Date(date);
        return `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`;        
    }
    const isPayed = (paeyd, total) =>{
        return paeyd >= total ? payedIcon : notPayedIcon;
    }
    const isShipped = (date) =>{
        return Date(date) !== Date() ? shippedIcon : notShippedIcon;
    }
    const changeLoadingCell = () =>{
        if(loading){
            console.log("Defini o skeleton")
            return(
                <TableRow>
                    <TableCell> <Skeleton variant="text" animation="wave"/> </TableCell>
                    <TableCell> <Skeleton variant="text" animation="wave"/> </TableCell>
                    <TableCell> <Skeleton variant="text" animation="wave"/> </TableCell>
                    <TableCell> <Skeleton variant="text" animation="wave"/> </TableCell>
                    <TableCell> <Skeleton variant="text" animation="wave"/> </TableCell>
                    <TableCell> <Skeleton variant="text" animation="wave"/> </TableCell>
                    <TableCell> <Skeleton variant="text" animation="wave"/> </TableCell>
                    <TableCell> <Skeleton variant="text" animation="wave"/> </TableCell>
                    <TableCell> <Skeleton variant="text" animation="wave"/> </TableCell>
                    <TableCell> <Skeleton variant="text" animation="wave"/> </TableCell>
                </TableRow>
            )
        }else{ 
            console.log("Defini as linhas")
            return(
            vendas.map(venda => 
                <TableRow key={venda.id_service}>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">{venda.client.nome}</TableCell>
                    <TableCell align="center">{venda.client.cpf_cnpj}</TableCell>
                    <TableCell align="center">{ formatDate(venda.date_input) }</TableCell>
                    <TableCell align="center">{formatDate(venda.date_ouput)}</TableCell>
                    <TableCell align="center">R$ {venda.payment.value_total}</TableCell>
                    <TableCell align="center">
                        <img src={isPayed(venda.payment.amount_paid, venda.payment.value_total)} alt=" "/>
                    </TableCell>
                    <TableCell align="center">
                        <img src={isShipped(venda.date_removed)} alt=" "/>
                    </TableCell>
                    <TableCell align="center">{venda.situation}</TableCell>
                    <TableCell align="center">detalhes</TableCell>
                </TableRow>
       ))}
    }

    const changeSituation = e =>{
        setSelectedSituation(e.target.value);
    }
    return(
        <div id="menu">
                <SideBar />
                
                <div id="menuContent">
                    <h1>Ordem de Serviços</h1>

                    <div id="menuFunctionBar">
                        <div id="searchPickers">
                            <div id="clientSearch">
                                <p>Pesquisar por cliente</p>
                                <TextField 
                                    variant="outlined"
                                    placeholder="Digite Aqui"
                                    size="small"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" >
                                                <img src={magnifyingGlassIcon} alt="search icon" />
                                            </InputAdornment>
                                        )
                                    }} />
                            </div>
                            <div id="sellSituation">
                                <p>Situação da Venda</p>
                                <TextField 
                                    select
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    value={selectedSituation}
                                    onChange={changeSituation}
                                    >
                                        {sellSituations.map((option) =>(
                                            <MenuItem key={option.value} value={option.value} >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </div>
                            <div id="dispatchDate">
                                <div>
                                    <img src={dateIcon} />
                                    <p>Data de Saida</p>
                                </div>
                                <div id="dataPicker">
                                    <TextField 
                                        type="date"
                                        variant="outlined"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}  />
                                    <p>a</p>
                                    <TextField 
                                        type="date"
                                        variant="outlined"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}  />
                                </div>
                            </div>
                        </div>
                        
                        <div id="menuButtons">
                            <button id="btnBudget">Orçamento</button>
                            <button id="btnOrder">Nova Ordem</button>
                        </div>
                    </div>
                    
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Rol</TableCell>
                                <TableCell align="center">Cliente</TableCell>
                                <TableCell align="center">CPF</TableCell>
                                <TableCell align="center">Entrada</TableCell>
                                <TableCell align="center">Retirada Planejada</TableCell>
                                <TableCell align="center">Valor Total</TableCell>
                                <TableCell align="center">Pagamento</TableCell>
                                <TableCell align="center">Entregue</TableCell>
                                <TableCell align="center">Situação</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { tableCell }
                                
                        </TableBody>
                    </Table>
                </div>

            </div>
    );
}

export default Menu;
