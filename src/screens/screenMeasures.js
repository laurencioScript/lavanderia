import React, {Component} from 'react';

import Header from '../public/header';
import img_placeholder from '../public/placeholder-img.jpg';

import './screenMeasures.css';
import CS from '../service/UnityService';

class index extends Component{
    state ={
        createState: false,
        editState: false,

        EnableEdit: true,
        EnableDelete: true,
        EnableInput: true,
        ClassEdit: "",
        ClassDelete: "",

        itenSelected: '',
        MeasureName: '',

        Medidas: [],
        Conteudo: [],
        Atualiza: true
    }
    componentDidMount(){
        this.componenAtualiza();
        this.verificaNivel();

        sessionStorage.removeItem("Selecionado");
    }

    async componenAtualiza(){
        let Medidas = await CS.getUnitys()
        this.setState({Medidas, Conteudo: Medidas})
    }


    pesquisa = async (val) => {
        val === "" 
        ? this.setState({Atualiza: true, Conteudo: await CS.getUnitys() })
        : this.setState({ Atualiza: false, Conteudo: this.retornaPesquisa(val)});
    }

    retornaPesquisa = (val) =>{
        let data = this.state.Medidas.map(res => {
            return  res.unity_name.toLowerCase().search(val) !== -1 ? res : undefined;
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
        let tabela = document.getElementById("corpo_tabela");
        let linhas = tabela.getElementsByTagName("tr");

        for(let i = 0; i < linhas.length; i++){
            let a = linhas[i];
            a.classList.remove("selecionado");
        }
    }
    verificaLista = (linha) =>{
        this.limpaLista();
        try{
            linha.classList.toggle("selecionado");
        }catch(e){
        }
    }

    btnCreate = () =>{
        this.setState({createState: ! this.state.createState});
        this.state.createState ? this.setState({EnableInput: true}) : this.setState({EnableInput: false});

        if(this.state.editState)
            this.setState({editState: false});
        else{}
    }

    btnEdit = () =>{
        this.setState({editState: !this.state.editState});
        this.state.editState == true ? this.setState({EnableInput: true}) : this.setState({EnableInput: false});
        if(this.state.createState)
            this.setState({createState: false});
        else{}
    }

    lineSelecting = Medidas =>{
        this.setState({itenSelected: Medidas.id_unity, MeasureName: Medidas.unity_name});
        this.setState({MeasureName: Medidas.unity_name});

        this.verificaLista(document.getElementById(Medidas.id_unity));
    }
    
    render(){
        return(
            <>
                <Header name="medidas"/>
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

                    <div id="content-users">
                        <div id="navigation-users">
                            <p>Lista de Medidas</p>
                            <div id="search">
                                <img src={img_placeholder} alt=" "></img>
                                <input 
                                    type="text"    
                                    placeholder="Procurar" 
                                    name="search" id="search-measures" 
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
                                    CS.deleteUnity(this.state.itenSelected)
                                }}>Excluir</button>
                        </div>
                    </div>

                    <div id='measures-content'>
                        <div id='measures-table'>
                            <table>
                                <tbody id="corpo_tabela">{
                                    this.state.Conteudo.map(Medidas =>{ 
                                        if(Medidas !== undefined){
                                            return(
                                                <tr key={Medidas.id_unity}
                                                    id={Medidas.id_unity}
                                                    onClick={()=>{this.lineSelecting(Medidas)}}
                                                >
                                                    <td>{Medidas.unity_name}</td>
                                                </tr>
                                            )
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div id='measures-action'>
                            <p>Nome da Unidade</p>
                            <input 
                                type='text'
                                id='measure-name'
                                disabled={this.state.EnableInput}
                                value={this.state.MeasureName}
                                onChange={ e=> this.setState({MeasureName: e.target.value})}
                            />

                            <input 
                                type='button'
                                id='measure-salvar'
                                value='Salvar'
                                onClick={() =>{
                                    let data = {
                                        "name": this.state.MeasureName
                                    };
                                    if(this.state.createState){
                                        CS.postUnity(data);
                                    }else if(this.state.editState){
                                        CS.putUnity(this.state.itenSelected, data);
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