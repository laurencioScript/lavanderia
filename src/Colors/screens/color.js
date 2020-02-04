import React, {Component} from 'react';
import { SliderPicker } from 'react-color';

import Header from '../../public/header';
import Bolinha from '../../public/bolinha';
import img_placeholder from '../../public/placeholder-img.jpg';
import icon_paleta from '../../public/icons/icon_paleta2.png';

import {getColors, postColor, putColor, deleteColor} from '../ColorsService';

import './color.css';


class color extends Component{
    state ={
        createState: false,
        editState: false,
        Cor: "",
        Cores: [],
        Conteudo: [],
        Atualiza: true
    }
    componentDidMount(){
        this.componenAtualiza();
        this.verificaNivel();

        sessionStorage.removeItem("Selecionado");
    }

    componentDidUpdate(){
        if(this.state.Atualiza)
           this.componenAtualiza();
    }

    componenAtualiza(){
        getColors().then(res => {
            var Cores = res;
            this.setState({Cores, Conteudo: Cores});
        });
    }
    pesquisa = async (val) => {
        //Esta função recebe o valor digitado pelo usuário, altera o estado Atualiza, que bloqueia a atualização
        //do didUpdate e chama a função retornaPesquisa caso tenha algo digitado na barra de pesquisa e faz o setState.

        //Como a função setState por si só ser assincrona, é de extrema importancia manter esta função assincrona
        //pois assim, a atualização do que o usuário escreve se mantem atualizada corretamente.
        val === "" 
        ? this.setState({Atualiza: true, Conteudo: await getColors() })
        : this.setState({Atualiza: false, Conteudo: this.retornaPesquisa(val)});
    }

    retornaPesquisa = (val) =>{
        //Esta função recebe de pesquisa, o valor digitado pelo usuário e monta o array com os campos filtrados.
        var data = this.state.Cores.map(res => {
            return  res.color_name.toLowerCase().search(val) !== -1 ||
                    res.hexadecimal.toLowerCase().search(val) !== -1 
                    ? res : undefined;
        });
        return data
    }

    verificaNivel(){
        if(sessionStorage.getItem('nivel') == 'Atendente')
        {   
            document.querySelector('#btn-edit').disabled = true;
            document.querySelector("#btn-delete").disabled = true;
            document.querySelector('#btn-edit').classList.toggle("btn-edit-disabled");
            document.querySelector("#btn-delete").classList.toggle('btn-delete-disabled');
        }else{
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
        try{
            document.getElementById(sessionStorage.getItem("Selecionado")).classList.toggle("selecionado");
        }catch(e){
        }
    }

    mudaCor = (color) =>{
        //esta função altera o colorPicker, caso o usuário clique na linha de uma cor já cadastrada.
        var param = color.hex === undefined ? ({Cor: color}) : ({Cor: color.hex});        
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
                        <img src={icon_paleta} alt="Icone identificador da pagina de CORES"></img>
                    </div>

                    <div id="content-users">
                        <div id="navigation-users">
                            <p>Lista de Cores</p>
                            <div id="search">
                                <img src={img_placeholder} alt=" "></img>
                                <input 
                                    type="text"    
                                    placeholder="Procurar" 
                                    name="search" id="search-color" 
                                    onChange={(e)=>{
                                        //Ao ter uma atualização no campo, a função pesquisa é chamada, passando o valor no campo.
                                        this.pesquisa(e.target.value.toLowerCase());
                                }} />
                            </div>
                            
                            <button id="btn-find">Localizar</button>

                            <button 
                                id="btn-create" 
                                onClick={() =>{
                                    this.setState({createState: !this.state.createState});
                                    this.state.createState ? document.querySelector("#color-name").disabled = true : document.querySelector("#color-name").disabled = false;
                                    
                                    if(this.state.editState)
                                        this.setState({editState: false});
                                }}
                            >Criar</button>
                            <button 
                                id="btn-edit"
                                onClick={() =>{
                                    this.setState({editState: !this.state.editState});
                                    this.state.editState ? document.querySelector("#color-name").disabled = true : document.querySelector("#color-name").disabled = false;
                                    if(this.state.createState)
                                        this.setState({createState: false}) ;
                                }}
                            >Editar</button>

                            <button 
                                id="btn-delete" 
                                onClick={() =>{
                                    deleteColor(sessionStorage.getItem('Selecionado'));
                                }}
                            >Excluir</button>
                        </div>
                    </div>

                    <div id='colors-content'>
                        <div id='colors-table'>
                            <table>
                                <tbody id="corpo_tabela">{
                                    this.state.Conteudo.map(Colors => {
                                        if(Colors !== undefined)
                                        return (
                                        <tr key={Colors.id_color} id={Colors.id_color}
                                            onClick={() =>{
                                                var cor = Colors.hexadecimal;
                                                this.mudaCor(cor);

                                                sessionStorage.setItem("Selecionado", localStorage.getItem("Selecionado") == Colors.id_color ? " " : Colors.id_color);
                                                this.verificaLista(document.getElementById(Colors.id_color));
                                                this.state.editState ? document.querySelector("#color-name").value = Colors.color_name : document.querySelector("#color-name").value = null;
                                            }}
                                        >   
                                            <td><div id='nome'>{Colors.color_name}</div> <Bolinha cor={Colors.hexadecimal} /></td>
                                        </tr>)
                                    })}
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
                                        {
                                            postColor(data);
                                        }
                                    else if(this.state.editState && !document.querySelector("#color-name").disabled)
                                        {
                                            putColor(sessionStorage.getItem('Selecionado'), data);
                                        }
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

export default color;