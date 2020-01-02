import React, {Component} from 'react';
import Axios from 'axios';

import Header from '../public/header';
import img_placeholder from '../public/placeholder-img.jpg';

import './measures.css';

class index extends Component{
    state ={
        createState: false,
        editState: false,
        Medidas: []
    }
    componentDidMount(){
        Axios.get('http://localhost:3000/unity' ,{headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}}).then(res => {
            var Medidas = res.data.result;
            this.setState({Medidas});
        });
        this.verificaNivel();

        sessionStorage.removeItem("Selecionado");
    }

    componentDidUpdate(){
        Axios.get('http://localhost:3000/unity' ,{headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}}).then(res => {
            var Medidas = res.data.result;
            this.setState({Medidas});
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
    render(){
        return(
            <>
                <Header name="medidas"/>
                <div id="volta">
                        <p>↪ Voltar</p>
                    </div>

                    <div id="icon-page">
                        {/* CARROUSEL */}
                        <img src={img_placeholder} alt=" "></img>
                    </div>

                    <div id="content-users" on >
                        <div id="navigation-users">
                            <p>Lista de Medidas</p>
                            <div id="search">
                                <img src={img_placeholder} alt=" "></img>
                                <input type="text" placeholder="Procurar" name="search" id="search-piece" onChange={()=>{sessionStorage.setItem("pesquisa", document.getElementById('search-user').value)}}/>
                            </div>
                            
                            <button id="btn-find">Localizar</button>

                            <button 
                                id="btn-create" 
                                onClick={() =>{
                                    this.setState({createState: !this.state.createState});
                                    this.state.createState == true ? document.querySelector("#measure-name").disabled = true : document.querySelector("#measure-name").disabled = false;
                                    if(this.state.editState)
                                        this.setState({editState: false});
                                }}
                            >Criar</button>
                            <button 
                                id="btn-edit"
                                onClick={() =>{
                                    this.setState({editState: !this.state.editState});
                                    this.state.editState == true ? document.querySelector("#measure-name").disabled = true : document.querySelector("#measure-name").disabled = false;
                                    if(this.state.createState)
                                        this.setState({createState: false}) ;
                                }}
                            >Editar</button>

                            <button 
                                id="btn-delete" 
                                onClick={() =>{
                                    Axios.delete('http://localhost:3000/unity/' + sessionStorage.getItem('Selecionado') ,{headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}});
                                }}
                            >Excluir</button>
                        </div>
                    </div>

                    <div id='measures-content'>
                        <div id='measures-table'>
                            <table>
                                <tbody id="corpo_tabela">{
                                    this.state.Medidas.map(Medidas => 
                                        <tr id={Medidas.id_unity}
                                            onClick={() =>{
                                                sessionStorage.setItem("Selecionado", localStorage.getItem("Selecionado") == Medidas.id_unity ? " " : Medidas.id_unity);
                                                this.verificaLista(document.getElementById(Medidas.id_unity));
                                                this.state.createState || this.state.editState ? document.querySelector("#measure-name").value = Medidas.unity_name : document.querySelector("#measure-name").value = null;
                                            }}    
                                        >
                                            <td>{Medidas.unity_name}</td>
                                        </tr>
                                    )}</tbody>
                            </table>
                        </div>

                        <div id='measures-action'>
                            <p>Nome da Unidade</p>
                            <input 
                                type='text'
                                id='measure-name'
                                disabled

                            />

                            <input 
                                type='button'
                                id='measure-salvar'
                                value='Salvar'
                                onClick={() =>{
                                    var data = {
                                        "name": document.getElementById('measure-name').value
                                    };
                                    if(this.state.createState && !document.querySelector("#measure-name").disabled)
                                        {Axios.post('http://localhost:3000/unity/register', data ,{headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}});
                                        console.log(document.querySelector("#measure-name").disabled);}
                                    else if(this.state.editState && !document.querySelector("#measure-name").disabled)
                                        {Axios.put('http://localhost:3000/unity/' + sessionStorage.getItem('Selecionado'), data ,{headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}})}
                                }}
                            />
                        </div>
                    </div>
                </>
        )
    }
}

export default index;