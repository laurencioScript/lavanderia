import React, {Component} from 'react';

import Header from '../public/header';
// import img_caracteristicas from '../public/icons/icon_caract.png';
import img_placeholder from '../public/placeholder-img.jpg';

import './features.css';

const Connection = require('../public/connection');

class index extends Component{
    state ={
        createState: false,
        editState: false,
        Caract: [],
        Conteudo: [],
        Atualiza: true
    }
    componentDidMount(){
        Connection.getCharacteristics().then(res => {
            var Caract = res;
            this.setState({Caract});
        });
        this.verificaNivel();

        sessionStorage.removeItem("Selecionado");
    }

    componentDidUpdate(){
        if(this.state.Atualiza)
           {this.componenAtualiza();}
    }
    componenAtualiza(){
        Connection.getCharacteristics().then(res => {
            var Caract = res;
            this.setState({Caract, Conteudo: Caract});
        });
    }
    pesquisa = async (val) => {
        val === "" 
        ? this.setState({Atualiza: true, Conteudo: await Connection.getCharacteristics() })
        : this.setState({Conteudo: this.retornaPesquisa(val), Atualiza: false});
    }

    retornaPesquisa = (val) =>{
        var data = this.state.Caract.map(res => {
            return  res.characteristic_name.toLowerCase().search(val) !== -1 
                    ? res : undefined;
        });

        return data
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
                <Header name="caracteristicas"/>
                <div id="volta">
                        <p>↪ Voltar</p>
                    </div>

                    <div id="icon-page">
                        {/* CARROUSEL */}
                        <img src={img_placeholder} alt=" "></img>
                    </div>

                    <div id="content-users" on >
                        <div id="navigation-users">
                            <p>Lista de Caracteristicas</p>
                            <div id="search">
                                <img src={img_placeholder} alt=" "></img>
                                <input 
                                    type="text"    
                                    placeholder="Procurar" 
                                    name="search" id="search-Features" 
                                    onChange={(e)=>{
                                        this.pesquisa(e.target.value.toLowerCase()).then(console.log(e.target.value))
                                }} />
                            </div>
                            
                            <button id="btn-find">Localizar</button>

                            <button 
                                id="btn-create" 
                                onClick={() =>{
                                    this.setState({createState: !this.state.createState});
                                    this.state.createState == true ? document.querySelector("#feature-name").disabled = true : document.querySelector("#feature-name").disabled = false;
                                    if(this.state.editState)
                                        this.setState({editState: false});
                                }}
                            >Criar</button>
                            <button 
                                id="btn-edit"
                                onClick={() =>{
                                    this.setState({editState: !this.state.editState});
                                    this.state.editState == true ? document.querySelector("#feature-name").disabled = true : document.querySelector("#feature-name").disabled = false;
                                    if(this.state.createState)
                                        this.setState({createState: false}) ;
                                }}
                            >Editar</button>

                            <button 
                                id="btn-delete" 
                                onClick={() =>{
                                    Connection.deleteCharacteristic(sessionStorage.getItem('Selecionado'));
                                    // Axios.delete('http://localhost:3000/characteristic/' + sessionStorage.getItem('Selecionado'),{headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}});
                                }}
                            >Excluir</button>
                        </div>
                    </div>

                    <div id='features-content'>
                        <div id='features-table'>
                            <table>
                                <tbody id="corpo_tabela">{
                                    this.state.Conteudo.map(Caract => {
                                        if(Caract !== undefined)
                                        return (
                                        <tr id={Caract.id_characteristic}
                                            onClick={() =>{
                                                sessionStorage.setItem("Selecionado", localStorage.getItem("Selecionado") == Caract.id_characteristic ? " " : Caract.id_characteristic);
                                                this.verificaLista(document.getElementById(Caract.id_characteristic));
                                                this.state.createState || this.state.editState ? document.querySelector("#feature-name").value = Caract.characteristic_name : document.querySelector("#feature-name").value = null;
                                            }}    
                                        >
                                            <td>{Caract.characteristic_name}</td>
                                        </tr>)
                                    })}</tbody>
                            </table>
                        </div>

                        <div id='features-action'>
                            <p>Nome da Caracteristica</p>
                            <input 
                                type='text'
                                id='feature-name'
                                disabled

                            />

                            <input 
                                type='button'
                                id='features-salvar'
                                value='Salvar'
                                onClick={() =>{
                                    var data = {
                                        "name": document.getElementById('feature-name').value
                                    };
                                    if(this.state.createState && !document.querySelector("#feature-name").disabled)
                                        {
                                            Connection.postCharacteristic(data);
                                            console.log(document.querySelector("#feature-name").disabled);
                                        }
                                    else if(this.state.editState && !document.querySelector("#feature-name").disabled)
                                        {
                                            Connection.putCharacteristic(sessionStorage.getItem('Selecionado'), data);
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