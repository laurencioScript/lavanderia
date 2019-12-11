import React, {Component} from 'react';
import Axios from 'axios';

import Header from '../public/header';
// import img_caracteristicas from '../public/icons/icon_caract.png';
import img_placeholder from '../public/placeholder-img.jpg';

import './features.css';

class index extends Component{
    state ={
        createState: false,
        editState: false,
        Caract: []
    }
    componentDidMount(){
        Axios.get('http://localhost:3000/characteristic').then(res => {
            var Caract = res.data.result[0];
            this.setState({Caract});
        });
        this.verificaNivel();

        sessionStorage.removeItem("Selecionado");
    }

    componentDidUpdate(){
        Axios.get('http://localhost:3000/characteristic').then(res => {
            var Caract = res.data.result[0];
            this.setState({Caract});
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
                                <input type="text" placeholder="Procurar" name="search" id="search-piece" onChange={()=>{sessionStorage.setItem("pesquisa", document.getElementById('search-user').value)}}/>
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
                                    Axios.delete('http://localhost:3000/characteristic/' + sessionStorage.getItem('Selecionado'));
                                }}
                            >Excluir</button>
                        </div>
                    </div>

                    <div id='features-content'>
                        <div id='features-table'>
                            <table>
                                <tbody id="corpo_tabela">{
                                    this.state.Caract.map(Caract => 
                                        <tr id={Caract.id_caracteristica}
                                            onClick={() =>{
                                                sessionStorage.setItem("Selecionado", localStorage.getItem("Selecionado") == Caract.id_caracteristica ? " " : Caract.id_caracteristica);
                                                this.verificaLista(document.getElementById(Caract.id_caracteristica));
                                                this.state.createState || this.state.editState ? document.querySelector("#feature-name").value = Caract.caracteristica : document.querySelector("#feature-name").value = null;
                                            }}    
                                        >
                                            <td>{Caract.caracteristica}</td>
                                        </tr>
                                    )}</tbody>
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
                                        "caracteristica": document.getElementById('feature-name').value
                                    };
                                    if(this.state.createState && !document.querySelector("#feature-name").disabled)
                                        {Axios.post('http://localhost:3000/characteristic/register', data);
                                        console.log(document.querySelector("#feature-name").disabled);}
                                    else if(this.state.editState && !document.querySelector("#feature-name").disabled)
                                        {Axios.put('http://localhost:3000/characteristic/' + sessionStorage.getItem('Selecionado'), data)}
                                }}
                            />
                        </div>
                    </div>
                </>
        )
    }
}

export default index;