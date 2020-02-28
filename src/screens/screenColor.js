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

        disableEdit: true,
        disableDelete: true,
        classEdit: "",
        classDelete: "",

        colorInputName: '',
        colorInputHexa: "",

        itenSelected: {
            itenId: '',
            itenName: '',
        },

        cores: [],

        contentBase: [],
        content: []
    }
    componentDidMount(){
        this.componentAtualiza();
        this.verificaNivel();
    }
    async componentAtualiza(){
        let content = await ConectServ.getColors();
        
        this.setState({content, Cores: content});
        this.setState({content, contentBase: content});
    }
    
    pesquisa = async (val) => {
        //Esta função recebe o valor digitado pelo usuário, altera o estado Atualiza, que bloqueia a atualização
        //do didUpdate e chama a função retornaPesquisa caso tenha algo digitado na barra de pesquisa e faz o setState.

        //Como a função setState por si só ser assincrona, é de extrema importancia manter esta função assincrona
        //pois assim, a atualização do que o usuário escreve se mantem atualizada corretamente.
        val === "" 
        ? this.componentAtualiza()
        : this.setState({content: this.retornaPesquisa(val)});
    }

    retornaPesquisa = (val) =>{
        //Esta função recebe de pesquisa, o valor digitado pelo usuário e monta o array com os campos filtrados.
        let data = this.state.contentBase.filter(res => {
            if(res.color_name.toLowerCase().search(val) !== -1 || res.hexadecimal.toLowerCase().search(val) !== -1 ){
                return res;
            }else{
                return undefined;
            }
        });

        return data;
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
    mudaCor = (color) =>{
        //esta função altera o colorPicker, caso o usuário clique na linha de uma cor já cadastrada.
        let param = color.hex === undefined ? ({colorInputHexa: color}) : ({colorInputHexa: color.hex})
        this.setState(param);
    }

    btnCreate = () =>{
        this.setState({createState: !this.state.createState, editState: false});
    }
    btnEdit = () =>{
        this.setState({editState: !this.state.editState, createState: false});
    }

    lineSelecting = Color =>{
        this.mudaCor(Color.hexadecimal);

        this.setState({itenSelected: {itenID: Color.id_color, itenName: Color.color_name},
            measureInputName: Color.color_name });
    }

    saveEdit = () =>{
        let data = {
            "name": this.state.colorInputName,
            "hexadecimal": this.state.colorInputName
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
                                    this.state.content.map(Colors => {
                                        return (
                                            <tr key={Colors.id_color} 
                                                onClick={()=>{ this.lineSelecting(Colors)}}
                                                className={this.state.itenSelected.itenID === Colors.id_color ? "selecionado" : ""}
                                            >                                                    
                                                <td>
                                                    <div id='nome'>{Colors.color_name}</div> 
                                                    <Bolinha cor={Colors.hexadecimal} />
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                            </table>
                        </div>

                        <div id='colors-action'>
                            <p>Nome da Cor</p>
                            <input 
                                type='text'
                                id='color-name'
                                disabled={this.state.createState || this.state.editState ? false : true}
                                value={this.state.colorInputName}
                                onChange={ e=> this.setState({colorInputName: e.target.value})}

                            />

                            <input 
                                type='button'
                                id='color-salvar'
                                value='Salvar'
                                onClick={this.saveEdit}
                            />
                            <div id='color-picker'>
                                <SliderPicker 
                                    color={this.state.colorInputHexa}
                                    onChangeComplete={this.mudaCor}/>
                                
                                <p>{this.state.colorInputHexa}</p>
                            </div>
                        </div>
                    </div>
                </>
        )
    }
}

export default color;