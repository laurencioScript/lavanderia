import React, {Component} from 'react';
import { SliderPicker } from 'react-color';

import Header from '../components/header';
import Bolinha from '../components/bolinha';
import img_placeholder from '../public/placeholder-img.jpg';
import icon_paleta from '../public/icons/icon_paleta2.png';

import ConectServ from '../service/ColorsService';

import './screenColor.css';


class color extends Component{
    state ={
        createState: false,
        editState: false,

        EnableEdit: true,
        EnableDelete: true,
        EnableInput: true,
        ClassEdit: "",
        ClassDelete: "",

        itenSelected: '',
        colorName: '',

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
    async componenAtualiza(){
        let Cores = await ConectServ.getColors()
        this.setState({Cores, Conteudo: Cores});
    }
    
    pesquisa = async (val) => {
        //Esta função recebe o valor digitado pelo usuário, altera o estado Atualiza, que bloqueia a atualização
        //do didUpdate e chama a função retornaPesquisa caso tenha algo digitado na barra de pesquisa e faz o setState.

        //Como a função setState por si só ser assincrona, é de extrema importancia manter esta função assincrona
        //pois assim, a atualização do que o usuário escreve se mantem atualizada corretamente.
        val === "" 
        ? this.setState({Atualiza: true, Conteudo: await ConectServ.getColors() })
        : this.setState({Atualiza: false, Conteudo: this.retornaPesquisa(val)});
    }

    retornaPesquisa = (val) =>{
        //Esta função recebe de pesquisa, o valor digitado pelo usuário e monta o array com os campos filtrados.
        let data = this.state.Cores.map(res => {
            return  res.color_name.toLowerCase().search(val) !== -1 ||
                    res.hexadecimal.toLowerCase().search(val) !== -1 
                    ? res : undefined;
        });
        return data
    }

    verificaNivel(){
        if(JSON.parse(sessionStorage.getItem('user')).cargo === 'Atendente'){
            this.setState({EnableEdit: true, EnableDelete: true,
                ClassDelete: "btn-delete-disabled", ClassEdit: "btn-edit-disabled"});
            console.log("BTN DESABILITADO");
        }else{
            this.setState({EnableEdit: false, EnableDelete: false,
                ClassDelete: "", ClassEdit: ""});
            console.log("BTN HABILITADO");
        }
    }


    limpaLista = () =>{
        //Função responsavel por limpar a antiga linha selecionada da tabela
        let tabela = document.getElementById("corpo_tabela");
        let linhas = tabela.getElementsByTagName("tr");

        for(let i = 0; i < linhas.length; i++){
            let a = linhas[i];
            a.classList.remove("selecionado");
        }
    }
    verificaLista = (linha) =>{
        //Função responsavel por fazer uma linha da tabela visivelmente selecionada
        this.limpaLista();
        try{
            linha.classList.toggle("selecionado");
        }catch(e){
        }
    }

    mudaCor = (color) =>{
        //esta função altera o colorPicker, caso o usuário clique na linha de uma cor já cadastrada.
        let param = color.hex === undefined ? ({Cor: color}) : ({Cor: color.hex})
        this.setState(param);
    }

    btnCreate = () =>{
        this.setState({createState: !this.state.createState});
        this.state.createState ? this.setState({EnableInput: true}) : this.setState({EnableInput: false});
        
        if(this.state.editState)
            this.setState({editState: false});
        else{}
    }
    btnEdit = () =>{
        this.setState({editState: !this.state.editState});
        this.state.editState ? this.setState({EnableInput: true}) : this.setState({EnableInput: false});
        if(this.state.createState)
            this.setState({createState: false});
        else{}
    }

    lineSelecting = Color =>{
        this.mudaCor(Color.hexadecimal);

        this.setState({itenSelected: this.state.itenSelected == Color.id_color ? " " : Color.id_color});
        this.setState({colorName: Color.color_name});        

        this.verificaLista(document.getElementById(Color.id_color));
    }

    saveEdit = () =>{
        let data = {
            "name": this.state.colorName,
            "hexadecimal": this.state.Cor
        };
        if(this.state.createState && !this.state.EnableInput){
            ConectServ.postColor(data);
            console.log("create")
        }
        else if(this.state.editState && !this.state.EnableInput){
            ConectServ.putColor(this.state.itenSelected, data);
            console.log("edit")
        }
    }

    render(){
        return(
            <>
                <Header name="cores"/>
                    <div id="volta">
                        <a id="btnVoltar"
                            href="/Menu">
                            <button>Voltar</button>
                        </a>
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

                            <button id="btn-create" onClick={this.btnCreate} >Criar</button>

                            <button 
                                id="btn-edit" 
                                className={this.state.ClassEdit} 
                                disabled={this.state.EnableEdit} 
                                onClick={this.btnEdit} >Editar</button>

                            <button 
                                id="btn-delete" 
                                className={this.state.ClassDelete}
                                disabled={this.state.EnableDelete}
                                onClick={() =>{ ConectServ.deleteColor(this.state.itenSelected); }} >Excluir</button>
                        </div>
                    </div>

                    <div id='colors-content'>
                        <div id='colors-table'>
                            <table>
                                <tbody id="corpo_tabela">{
                                    this.state.Conteudo.map(Colors => {
                                        if(Colors !== undefined){
                                            return (
                                                <tr key={Colors.id_color} 
                                                    id={Colors.id_color}
                                                    onClick={()=>{ this.lineSelecting(Colors)}}>
                                                        
                                                    <td>
                                                        <div id='nome'>{Colors.color_name}</div> 
                                                        <Bolinha cor={Colors.hexadecimal} />
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    })}
                                    </tbody>
                            </table>
                        </div>

                        <div id='colors-action'>
                            <p>Nome da Cor</p>
                            <input 
                                type='text'
                                id='color-name'
                                disabled={this.state.EnableInput}
                                value={this.state.colorName}
                                onChange={ e=> this.setState({colorName: e.target.value})}

                            />

                            <input 
                                type='button'
                                id='color-salvar'
                                value='Salvar'
                                onClick={this.saveEdit}
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