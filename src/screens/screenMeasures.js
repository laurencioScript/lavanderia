import React, {Component} from 'react';

import './screenMeasures.css';
import img_placeholder from '../public/placeholder-img.jpg';
import Header from '../public/header';
import ConectServ from '../service/UnityService';


class index extends Component{
    state ={
        // Através destes estados, sabe-se qual botão (Criar ou Editar) está selecionado.
        createState: false,
        editState: false,

        // Através destes estados, Os botões editar e deletar são bloqueados, para caso o usuário não tenha acesso a eles.
        disableEdit: true,
        disableDelete: true,
        classEdit: "",
        classDelete: "",

        // Aqui é armazenado o valor que o usuário digita em "Nome da Unidade"
        measureInputName: "",

        // A linha selecionada é armazenada aqui.
        itenSelected: {
            itenID: '',
            itenName: ''
        },

        // Para a mudança das cores do button de save, aqui são armazenados os valores hexadeciamis para criar, editar e deletar, respectivamente.
        saveColors:[
            "#929292",
            "#06ce11",
            "#f4eb49"
        ],
        saveButtonColor: "0",

        // Content é a base, onde é armazenado o JSON que vem do back-end
        contentBase: [],
        content: []
    }

    componentDidMount(){
        // Antes do componente inicializar, é feita a preparação do mesmo.
        this.componentAtualiza();
        this.verificaNivel();
    }

    async componentAtualiza(){
        // é feita a requisição das unidades para o back-end
        let content = await ConectServ.getUnitys()
        this.setState({contentBase: content, content});
    }


    pesquisa = async (val) => {
        // Verifica se o valor do input de pesquisa não está vazio, caso não esteja, ele atualiza o state com as medidas de acordo com a pesquisa.
        val === "" 
        ? this.componentAtualiza()
        : this.setState({content: this.retornaPesquisa(val)});
    }

    retornaPesquisa = (val) =>{
        // É feito o filtro dentro do state Content removendo o que não conten nada relacionado ao que o usuario pesquisou
        let data = this.state.contentBase.filter(res =>{ 
            return res.unity_name.toLowerCase().search(val) !== -1 ? res : undefined });

        return data
    }



    verificaNivel(){
        // Verifica o cargo do usuário e bloqueia os botões (EDIT e DELETE), caso o mesmo não tenha xp o suficiente.
        if(JSON.parse(sessionStorage.getItem('user')).cargo === 'Atendente'){   
            this.setState({disableEdit: true, disableDelete: true,
                classDelete: "btn-delete-disabled", classEdit: "btn-edit-disabled"});
            console.log("BTN DESABILITADO");
        }else{
            this.setState({disableEdit: false, disableDelete: false,
                classDelete: "", classEdit: ""});
            console.log("BTN HABILITADO");
        }
    }

    btnCreate = () =>{
        // Altera os states determinando que o btn CREATE está ativo
        this.setState({createState: !this.state.createState, editState: false});
        this.setState({saveButtonColor: this.state.saveButtonColor === "1" ? "0" : "1"});
    }
    
    btnEdit = () =>{
        // Altera os states determinando que o btn EDIT está ativo
        this.setState({editState: !this.state.editState, createState: false});
        this.setState({saveButtonColor: this.state.saveButtonColor === "2" ? "0" : "2"});
    }

    lineSelecting = Medidas =>{
        // Salva o valor da medida selecionada e altera o valor do input de nome.
        this.setState({itenSelected: {itenID: Medidas.id_unity, itenName: Medidas.unity_name},
                        measureInputName: Medidas.unity_name });
    }
    
    saveEdit = async () =>{
        let data = {
            "name": this.state.measureInputName
        };
        if(this.state.createState){
            await ConectServ.postUnity(data);
        }else if(this.state.editState){
            await ConectServ.putUnity(this.state.itenSelected.itenID, data);
        }

        this.componentAtualiza();
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
                                className={this.state.classEdit}
                                disabled={this.state.disableEdit}
                                onClick={this.btnEdit} >Editar</button>

                            <button 
                                id="btn-delete" 
                                className={this.state.classDelete}
                                disabled={this.state.disableDelete}
                                onClick={() =>{
                                    ConectServ.deleteUnity(this.state.itenSelected.itenID)
                                }}>Excluir</button>
                        </div>
                    </div>

                    <div id='measures-content'>
                        <div id='measures-table'>
                            <table>
                                <tbody id="corpo_tabela">{
                                    this.state.content.map(Medidas =>{
                                        return(
                                            <tr key={Medidas.id_unity}
                                                onClick={()=>{this.lineSelecting(Medidas)}}
                                                className={this.state.itenSelected.itenID === Medidas.id_unity ? "selecionado" : ""}
                                            >
                                                <td>{Medidas.unity_name}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div id='measures-action'>
                            <p>Nome da Unidade</p>
                            <input 
                                type='text'
                                id='measure-name'
                                disabled={this.state.createState || this.state.editState ? false : true}
                                value={this.state.measureInputName}
                                onChange={ e => {
                                    this.setState({measureInputName: e.target.value})
                                }}
                            />

                            <input 
                                type='button'
                                id='measure-salvar'
                                value='Salvar'
                                style={{backgroundColor: this.state.saveColors[this.state.saveButtonColor] }}
                                onClick={this.saveEdit}
                            />
                        </div>
                    </div>
                </>
        )
    }
}

export default index;