import React, {Component} from 'react';

import Header from '../public/header';
import img_placeholder from '../public/placeholder-img.jpg';

import './screenDefect.css';

import CS from '../service/DefectService';

class index extends Component{
    state ={
        createState: false,
        editState: false,

        EnableEdit: false,
        EnableDelete: false,
        EnableInput: true,
        ClassEdit: "",
        ClassDelete: "",

        itenSelected: '',
        measureName: '',

        Defeitos: [],
        Conteudo:[],
        Atualiza: true
    }
    componentDidMount(){
        this.componenAtualiza();
        this.verificaNivel();

        sessionStorage.removeItem("Selecionado");
    }

    async componenAtualiza(){
        let Defeitos = await CS.getDefects()
        this.setState({Defeitos, Conteudo: Defeitos});
    }

    pesquisa = async (val) => {
        if(val === ""){
            this.setState({Atualiza: true, Conteudo: await CS.getDefects() })
        }else{
            this.setState({Atualiza: false, Conteudo: this.retornaPesquisa(val)});
        }
    }

    retornaPesquisa = (val) =>{
        let data = this.state.Defeitos.map(res => {
            return  res.defect_name.toLowerCase().search(val) !== -1 
                ? res : undefined;
        });
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

    btnCreate = () =>{
        this.setState({createState: !this.state.createState});
        this.state.createState == true ? this.setState({EnableInput: true}) : this.setState({EnableInput: false});
        if(this.state.editState)
            this.setState({editState: false});
        else{}
    }

    btnEdit = () =>{
        this.setState({editState: !this.state.editState});
        this.state.editState == true ? this.setState({EnableInput: true}) : this.setState({EnableInput: false});
        if(this.state.createState)
            this.setState({createState: false}) ;
        else{}
    }

    lineSelecting = Defeitos =>{
        this.setState({itenSelected: Defeitos.id_defect, measureName: Defeitos.defect_name})
        if(this.state.createState || this.state.editState){
            this.state.measureName = Defeitos.defect_name
        }   else{ this.state.measureName = " " }

        this.verificaLista(document.getElementById(Defeitos.id_defect))

        // sessionStorage.setItem("Selecionado", localStorage.getItem("Selecionado") == Defeitos.id_defect ? " " : Defeitos.id_defect);
        // this.verificaLista(document.getElementById(Defeitos.id_defect));
        // this.state.createState || this.state.editState ? document.querySelector("#defect-name").value = Defeitos.defeito : document.querySelector("#defect-name").value = null;
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
                                    CS.deleteDefect(this.state.itenSelected);
                                }}>Excluir</button>
                        </div>
                    </div>

                    <div id='defects-content'>
                        <div id='defects-table'>
                            <table>
                                <tbody id="corpo_tabela">{
                                    this.state.Conteudo.map(Defeitos => {
                                        if(Defeitos !== undefined)
                                        return(
                                        <tr id={Defeitos.id_defect}
                                            onClick={() =>{this.lineSelecting(Defeitos)}}    
                                        >
                                            <td>{Defeitos.defect_name}</td>
                                        </tr>)
                                    })}</tbody>
                            </table>
                        </div>

                        <div id='defects-action'>
                            <p>Nome do Defeito</p>
                            <input 
                                type='text'
                                id='defect-name'
                                disabled={this.state.EnableInput}
                                value={this.state.measureName}
                                onChange={ e => this.setState({measureName: e.target.value})}

                            />

                            <input 
                                type='button'
                                id='defect-salvar'
                                value='Salvar'
                                onClick={() =>{
                                    var data = {
                                        "name": this.state.measureName
                                    };
                                    if(this.state.createState){
                                        CS.postDefect(data);
                                    }else if(this.state.editState){
                                        CS.putDefect(this.state.itenSelected, data);
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