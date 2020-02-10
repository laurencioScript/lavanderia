import React, {Component} from 'react';

import Header from '../public/header';
import img_placeholder from '../public/placeholder-img.jpg';

import './screenDefect.css';

import CS from '../service/DefectService';

class index extends Component{
    state ={
        createState: false,
        editState: false,
        Defeitos: [],
        Conteudo:[],
        Atualiza: true
    }
    componentDidMount(){
        this.componenAtualiza();
        // this.verificaNivel();

        sessionStorage.removeItem("Selecionado");
    }
    componentDidUpdate(){
        if(this.state.Atualiza)
           {this.componenAtualiza();}
    }

    async componenAtualiza(){
        let Defeitos = await CS.getDefects()
        this.setState({Defeitos, Conteudo: Defeitos});

        this.verificaLista();
    }
    pesquisa = async (val) => {
        val === "" 
        ? this.setState({Atualiza: true, Conteudo: await CS.getDefects() })
        : this.setState({Atualiza: false, Conteudo: this.retornaPesquisa(val)});
    }

    retornaPesquisa = (val) =>{
        let data = this.state.Defeitos.map(res => {
            return  res.defect_name.toLowerCase().search(val) !== -1 
                    ? res : undefined;
        });

        return data
    }

    // verificaNivel(){
    //     if(sessionStorage.getItem('nivel') == 'Atendente')
    //     {   console.log("BTN DESABILITADO");
    //         document.querySelector('#btn-edit').disabled = true;
    //         document.querySelector("#btn-delete").disabled = true;

    //         document.querySelector('#btn-edit').classList.toggle("btn-edit-disabled");
    //         document.querySelector("#btn-delete").classList.toggle('btn-delete-disabled');
    //     }else{
    //         console.log("BTN HABILITADO");
    //         document.querySelector("#btn-edit").disabled = false;
    //         document.querySelector("#btn-delete").disabled = false;
    //         document.querySelector('#btn-edit').classList.remove('btn-edit-disabled');
    //         document.querySelector("#btn-delete").classList.remove('btn-delete-disabled');
    //     }
    // }

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
    render(){
        return(
            <>
                <Header name="defeitos"/>
                <div id="volta">
                        <p>↪ Voltar</p>
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
                                onClick={() =>{
                                    this.setState({createState: !this.state.createState});
                                    this.state.createState == true ? document.querySelector("#defect-name").disabled = true : document.querySelector("#defect-name").disabled = false;
                                    if(this.state.editState)
                                        this.setState({editState: false});
                                }}
                            >Criar</button>
                            <button 
                                id="btn-edit"
                                onClick={() =>{
                                    this.setState({editState: !this.state.editState});
                                    this.state.editState == true ? document.querySelector("#defect-name").disabled = true : document.querySelector("#defect-name").disabled = false;
                                    if(this.state.createState)
                                        this.setState({createState: false}) ;
                                }}
                            >Editar</button>

                            <button 
                                id="btn-delete" 
                                onClick={() =>{
                                    CS.deleteDefect(sessionStorage.getItem('Selecionado'));
                                }}
                            >Excluir</button>
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
                                            onClick={() =>{
                                                sessionStorage.setItem("Selecionado", localStorage.getItem("Selecionado") == Defeitos.id_defect ? " " : Defeitos.id_defect);
                                                this.verificaLista(document.getElementById(Defeitos.id_defect));
                                                this.state.createState || this.state.editState ? document.querySelector("#defect-name").value = Defeitos.defeito : document.querySelector("#defect-name").value = null;
                                            }}    
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
                                disabled

                            />

                            <input 
                                type='button'
                                id='defect-salvar'
                                value='Salvar'
                                onClick={() =>{
                                    var data = {
                                        "name": document.getElementById('defect-name').value
                                    };
                                    if(this.state.createState && !document.querySelector("#defect-name").disabled)
                                        {   
                                            CS.postDefect(data);
                                        }
                                    else if(this.state.editState && !document.querySelector("#defect-name").disabled)
                                        {
                                            CS.putDefect(sessionStorage.getItem('Selecionado'), data);
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