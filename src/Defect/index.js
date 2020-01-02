import React, {Component} from 'react';
import Axios from 'axios';

import Header from '../public/header';
import img_placeholder from '../public/placeholder-img.jpg';

import './defects.css';

class index extends Component{
    state ={
        createState: false,
        editState: false,
        Defeitos: []
    }
    componentDidMount(){
        Axios.get('http://localhost:3000/defect',{headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}}).then(res => {
            var Defeitos = res.data.result;
            this.setState({Defeitos});

            console.log(Defeitos);
        });
        this.verificaNivel();

        sessionStorage.removeItem("Selecionado");
    }

    componentDidUpdate(){
        Axios.get('http://localhost:3000/defect',{headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}}).then(res => {
            var Defeitos = res.data.result;
            this.setState({Defeitos});
        });


        
        this.verificaLista();
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
                                <input type="text" placeholder="Procurar" name="search" id="search-piece" onChange={()=>{sessionStorage.setItem("pesquisa", document.getElementById('search-user').value)}}/>
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
                                    Axios.delete('http://localhost:3000/defect/' + sessionStorage.getItem('Selecionado') ,{headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}});
                                }}
                            >Excluir</button>
                        </div>
                    </div>

                    <div id='defects-content'>
                        <div id='defects-table'>
                            <table>
                                <tbody id="corpo_tabela">{
                                    this.state.Defeitos.map(Defeitos => 
                                        <tr id={Defeitos.id_defect}
                                            onClick={() =>{
                                                sessionStorage.setItem("Selecionado", localStorage.getItem("Selecionado") == Defeitos.id_defect ? " " : Defeitos.id_defect);
                                                this.verificaLista(document.getElementById(Defeitos.id_defect));
                                                this.state.createState || this.state.editState ? document.querySelector("#defect-name").value = Defeitos.defeito : document.querySelector("#defect-name").value = null;
                                            }}    
                                        >
                                            <td>{Defeitos.defect_name}</td>
                                        </tr>
                                    )}</tbody>
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
                                        {Axios.post('http://localhost:3000/defect/register', data ,{headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}});
                                        console.log(document.querySelector("#defect-name").disabled);}
                                    else if(this.state.editState && !document.querySelector("#defect-name").disabled)
                                        {Axios.put('http://localhost:3000/defect/' + sessionStorage.getItem('Selecionado'), data ,{headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}})}
                                }}
                            />
                        </div>
                    </div>
                </>
        )
    }
}

export default index;