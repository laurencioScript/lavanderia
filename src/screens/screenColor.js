import React, {Component} from 'react';
import { SliderPicker } from 'react-color';

import './screenColor.css';
import img_placeholder from '../public/placeholder-img.jpg';
import Header from '../components/header';
import Bolinha from '../components/bolinha';
import icon_paleta from '../public/icons/icon_paleta2.png';

import ConectServ from '../service/ColorsService';


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
            itenName: ''
        },

        saveColors:[
            "#929292",
            "#06ce11",
            "#f4eb49"
        ],
        saveButtonColor: "0",

        contentBase: [],
        content: []
    }
    componentDidMount(){
        this.componentAtualiza();
        this.verificaNivel();
    }
    async componentAtualiza(){
        let content = await ConectServ.getColors();
        
        this.setState({content, contentBase: content});
    }
    
    pesquisa = async (val) => {
        val === "" 
        ? this.componentAtualiza()
        : this.setState({content: this.retornaPesquisa(val)});
    }

    retornaPesquisa = (val) =>{
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
        this.setState({saveButtonColor: this.state.saveButtonColor === "1" ? "0" : "1"});
    }
    btnEdit = () =>{
        this.setState({saveButtonColor: this.state.saveButtonColor === "2" ? "0" : "2"});
        this.setState({editState: !this.state.editState, createState: false});
    }

    lineSelecting = Color =>{
        this.mudaCor(Color.hexadecimal);

        this.setState({itenSelected: {itenID: Color.id_color, itenName: Color.color_name},
            colorInputName: Color.color_name });
    }

    saveEdit = async () =>{
        let data = {
            "name": this.state.colorInputName,
            "hexadecimal": this.state.colorInputHexa
        };
        if(this.state.createState && !this.state.EnableInput){
            await ConectServ.postColor(data);
            console.log("create")
        }
        else if(this.state.editState && !this.state.EnableInput){
            await ConectServ.putColor(this.state.itenSelected, data);
            console.log("edit")
        }

        this.componentAtualiza();
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
                                style={{backgroundColor: this.state.saveColors[this.state.saveButtonColor] }}
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