import React, {Component} from 'react';

import Header from '../public/header';
import img_placeholder from '../public/placeholder-img.jpg';

import './screenDefect.css';

import ConectServ from '../service/DefectService';

class index extends Component{
    state ={
        createState: false,
        editState: false,

        disableEdit: false,
        disableDelete: false,
        classEdit: "",
        classDelete: "",

        defectInputName: '',

        itenSelected: {
            itenID: '',
            itenName: '',
        },

        contentBase: [],
        content: [],
    }
    componentDidMount(){
        this.componentAtualiza();
        this.verificaNivel();
    }

    async componentAtualiza(){
        let content = await ConectServ.getDefects()
        this.setState({contentBase: content, content});
    }

    pesquisa = async (val) => {
        if(val === ""){
            this.componentAtualiza()
        }else{
            this.setState({content: this.retornaPesquisa(val)});
        }
    }

    retornaPesquisa = (val) =>{
        let data = this.state.contentBase.filter(res => {
            return  res.defect_name.toLowerCase().search(val) !== -1 ? res : undefined;});

        return data;
    }

    verificaNivel(){
        if(JSON.parse(sessionStorage.getItem('user')).cargo == 'Atendente'){   
            this.setState({EnableEdit: true, EnableDelete: true,
                ClassDelete: "btn-delete-disabled", ClassEdit: "btn-edit-disabled"});
            console.log("BTN DESABILITADO");

        }else{
            this.setState({EnableEdit: false, EnableDelete: false,
                ClassDelete: "", ClassEdit: ""});
            console.log("BTN HABILITADO");
        }
    }

    btnCreate = () =>{
        this.setState({createState: !this.state.createState, editState: false});
    }

    btnEdit = () =>{
        this.setState({editState: !this.state.editState, createState: false});
    }

    lineSelecting = Defeitos =>{
        this.setState({itenSelected: {itenID: Defeitos.id_defect, itenName: Defeitos.defect_name},
            defectInputName: Defeitos.defect_name });
    }



    render(){
        return(
            <>
                <Header name="defeitos"/>
                    <div id="volta">
                        <a  id="btnVoltar"
                            href="/Menu">
                            <button>Voltar</button>
                        </a>
                    </div>

                    <div id="icon-page">
                        {/* CARROUSEL */}
                        <img src={img_placeholder} alt=" "></img>
                    </div>

                    <div id="content-users" on >
                        <div id="navigation-users">
                            <p>Lista de Defeitos</p>
                            <div id="search">
                                <img src={img_placeholder} alt=" "></img>
                                <input 
                                    type="text"    
                                    placeholder="Procurar" 
                                    name="search" id="search-defect" 
                                    onChange={(e)=>{
                                        this.pesquisa(e.target.value.toLowerCase())
                                }} />
                            </div>
                            
                            <button id="btn-find">Localizar</button>

                            <button 
                                id="btn-create" 
                                onClick={this.btnCreate} >Criar</button>

                            <button 
                                id="btn-edit"
                                className={this.state.ClassEdit}
                                disabled={this.state.EnableEdit}
                                onClick={this.btnEdit} >Editar</button>

                            <button 
                                id="btn-delete" 
                                className={this.state.ClassDelete}
                                disabled={this.state.EnableDelete}
                                onClick={() =>{
                                    ConectServ.deleteDefect(this.state.itenSelected);
                                }}>Excluir</button>
                        </div>
                    </div>

                    <div id='defects-content'>
                        <div id='defects-table'>
                            <table>
                                <tbody id="corpo_tabela">{
                                    this.state.content.map(Defeitos => {
                                        return(
                                            <tr key={Defeitos.id_defect}
                                                onClick={() =>{this.lineSelecting(Defeitos)}}  
                                                className={this.state.itenSelected.itenID === Defeitos.id_defect ? 'selecionado' : ''}  
                                            >
                                                <td>{Defeitos.defect_name}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div id='defects-action'>
                            <p>Nome do Defeito</p>
                            <input 
                                type='text'
                                id='defect-name'
                                disabled={this.state.createState || this.state.editState ? false : true}
                                value={this.state.defectInputName}
                                onChange={ e => this.setState({defectInputName: e.target.value})}

                            />

                            <input 
                                type='button'
                                id='defect-salvar'
                                value='Salvar'
                                onClick={() =>{
                                    var data = {
                                        "name": this.state.defectInputName
                                    };
                                    if(this.state.createState){
                                        ConectServ.postDefect(data);
                                    }else if(this.state.editState){
                                        ConectServ.putDefect(this.state.itenSelected.itenID, data);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </>
        )
    }
}

export default index;