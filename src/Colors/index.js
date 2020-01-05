import React, {Component} from 'react';
import Axios from 'axios';
import { SliderPicker } from 'react-color';

import Header from '../public/header';
import Bolinha from './bolinha';
import img_placeholder from '../public/placeholder-img.jpg';
import icon_paleta from '../public/icons/icon_paleta2.png';

import './colors.css';
import { isObject } from 'util';

class index extends Component{
    state ={
        createState: false,
        editState: false,
        Cor: "",
        Cores: []
    }
    componentDidMount(){
        Axios.get('http://localhost:3000/color',{headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}}).then(res => {
            var Cores = res.data.result;
            this.setState({Cores});
        });
        this.verificaNivel();

        sessionStorage.removeItem("Selecionado");
    }

    componentDidUpdate(){
        Axios.get('http://localhost:3000/color',{headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}}).then(res => {
            var Cores = res.data.result;
            this.setState({Cores});
        });
    }

    verificaNivel(){
        if(sessionStorage.getItem('nivel') == 'Atendente')
        {   console.log("BTN DESABILITADO");
            document.querySelector('#btn-edit').disabled = true;
            document.querySelector("#btn-delete").disabled = true;

            document.querySelector('#btn-edit').classList.toggle("btn-edit-disabled");
            document.querySelector("#btn-delete").classList.toggle('btn-delete-disabled');
        }else{
            console.log("BTN HABILITADO");
            document.querySelector("#btn-edit").disabled = false;
            document.querySelector("#btn-delete").disabled = false;
            document.querySelector('#btn-edit').classList.remove('btn-edit-disabled');
            document.querySelector("#btn-delete").classList.remove('btn-delete-disabled');
        }
    }
    limpaLista = () =>{
        var tabela = document.getElementById("corpo_tabela");
        var linhas = tabela.getElementsByTagName("tr");

        for(var i = 0; i < linhas.length; i++){
            var a = linhas[i];
            a.classList.remove("selecionado");
        }
    }
    verificaLista = (linha) =>{
        this.limpaLista();
        // linha.classList.toggle("selecionado");
        try{
            document.getElementById(sessionStorage.getItem("Selecionado")).classList.toggle("selecionado");
        }catch(e){
        }
    }
    mudaCor = (color) =>{
        var param;

        if(color.hex === undefined)
            param = ({Cor: color});
        else 
            param = ({Cor: color.hex});
        
        this.setState(param);
    }
    render(){
        return(
            <>
                <Header name="cores"/>
                <div id="volta">
                        <p>↪ Voltar</p>
                    </div>

                    <div id="icon-page">
                        {/* CARROUSEL */}
                        <img src={icon_paleta} alt=" "></img>
                    </div>

                    <div id="content-users" on >
                        <div id="navigation-users">
                            <p>Lista de Cores</p>
                            <div id="search">
                                <img src={img_placeholder} alt=" "></img>
                                <input type="text" placeholder="Procurar" name="search" id="search-piece" onChange={()=>{sessionStorage.setItem("pesquisa", document.getElementById('search-user').value)}}/>
                            </div>
                            
                            <button id="btn-find">Localizar</button>

                            <button 
                                id="btn-create" 
                                onClick={() =>{
                                    this.setState({createState: !this.state.createState});
                                    this.state.createState == true ? document.querySelector("#color-name").disabled = true : document.querySelector("#color-name").disabled = false;
                                    if(this.state.editState)
                                        this.setState({editState: false});
                                }}
                            >Criar</button>
                            <button 
                                id="btn-edit"
                                onClick={() =>{
                                    this.setState({editState: !this.state.editState});
                                    this.state.editState == true ? document.querySelector("#color-name").disabled = true : document.querySelector("#color-name").disabled = false;
                                    if(this.state.createState)
                                        this.setState({createState: false}) ;
                                }}
                            >Editar</button>

                            <button 
                                id="btn-delete" 
                                onClick={() =>{
                                    Axios.delete('http://localhost:3000/color/' + sessionStorage.getItem('Selecionado') , {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}});
                                }}
                            >Excluir</button>
                        </div>
                    </div>

                    <div id='colors-content'>
                        <div id='colors-table'>
                            <table>
                                <tbody id="corpo_tabela">{
                                    this.state.Cores.map(Colors => 
                                        <tr id={Colors.id_color}
                                            onClick={() =>{
                                                var cor = Colors.hexadecimal;
                                                this.mudaCor(cor);

                                                sessionStorage.setItem("Selecionado", localStorage.getItem("Selecionado") == Colors.id_color ? " " : Colors.id_color);
                                                this.verificaLista(document.getElementById(Colors.id_color));
                                                this.state.editState ? document.querySelector("#color-name").value = Colors.color_name : document.querySelector("#color-name").value = null;
                                            }}
                                        >   
                                            <td><div id='nome'>{Colors.color_name}</div> <Bolinha cor={Colors.hexadecimal} /></td>
                                        </tr>
                                    )}
                                    </tbody>
                            </table>
                        </div>

                        <div id='colors-action'>
                            <p>Nome da Cor</p>
                            <input 
                                type='text'
                                id='color-name'
                                disabled

                            />

                            <input 
                                type='button'
                                id='color-salvar'
                                value='Salvar'
                                onClick={() =>{
                                    var data = {
                                        "name": document.getElementById('color-name').value,
                                        "hexadecimal": this.state.Cor
                                    };
                                    if(this.state.createState && !document.querySelector("#color-name").disabled)
                                        {Axios.post('http://localhost:3000/color/register', data ,{headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}});
                                        console.log(document.querySelector("#color-name").disabled);}
                                    else if(this.state.editState && !document.querySelector("#color-name").disabled)
                                        {Axios.put('http://localhost:3000/color/' + sessionStorage.getItem('Selecionado'), data ,{headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}})}
                                }}
                            />
                            <div id='color-picker'>
                                <SliderPicker 
                                    color={this.state.Cor}
                                    onChangeComplete={this.mudaCor}/>
                                
                                <p>{this.state.Cor}</p>
                            </div>
                        </div>
                    </div>
                </>
        )
    }
}

export default index;