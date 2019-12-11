import React, { Component } from 'react';
import Header from '../../public/header';
import { Link } from 'react-router-dom';

import Axios from 'axios';

import './update.css';
import Cor from '../Create/Cor';

class index extends Component{
    state = {
        Cliente: []
    }

    componentDidMount(){
        Axios.get("http://localhost:3000/client/" + this.props.ClienteId).then(res =>{
            var data = res.data.result[0];
            this.setState({Cliente: data});
        });
    }
    updateDataBase(){
        console.log("FOI")
        Axios.put("http://localhost:3000/client/" + this.props.ClienteId).then(res => {
            console.log(res);
            // A ser trocado pela mensagem de atualização correta, ou não.
        })
    }
    
    render(){
        return(
            <>
                <Header name="Editar Cliente"/>

                <div id="menu-create-customer">
                    <div id="volta">
                        <Link to="/Clientes">
                            <p>↪ Voltar</p>
                        </Link>
                    </div>

                    <div id="buttons">
                        <Link to="/Clientes">
                            <button 
                                id="btn-list" 
                            >Listar</button>
                        </Link>
                    </div>
                </div>

                <div id="createCustomer-container">
                    <div id="createCustomer-content">
                        <div id="first-line">
                            <div id="name">
                                <p class="title">Nome</p>
                                <input type="text" />
                            </div>
                            <div id="corporateName">
                                <p class="title">Razão Social</p>
                                <input type="text" />
                            </div>
                            <div id="CNPJ">
                                <p class="title">CNPJ</p>
                                <input type="text" />
                            </div>
                        </div>
                        
                        <div id="secondLine">
                            <div id="CPF">
                                <p class="title">CPF</p>
                                <input type="text" />
                            </div>

                            <div id="publicPlace">
                                <p class="title">Logradouro</p>
                                <input type="text" />
                            </div>

                            <div id="number">
                                <p class="title">Número</p>
                                <input type="text" />
                            </div>
                            <div id="complement">
                                <p class="title">Complemento</p>
                                <input type="text" />
                            </div>
                        </div>
                        
                        <div id="third-line">
                            <div id="neighborhood">
                                <p class="title">Bairro</p>
                                <input type="text" />
                            </div>

                            <div id="city">
                                <p class="title">Cidade</p>
                                <input type="text" />
                            </div>

                            <div id="state">
                                <p class="title">Estado</p>
                                <select>
                                        <option value="alagoas">
                                            AL
                                        </option>
                                        <option value="acre">
                                            AC
                                        </option>
                                        <option value="amapá">
                                            AP
                                        </option>
                                        <option value="amazonas">
                                            AM
                                        </option>
                                        <option value="bahia">
                                            BA
                                        </option>
                                        <option value="ceará">
                                            CE
                                        </option>
                                        <option value="distrito federal">
                                            DF
                                        </option>
                                        <option value="espírito santo">
                                            ES
                                        </option>
                                        <option value="goiás">
                                            GO
                                        </option>
                                        <option value="maranhã">
                                            MA
                                        </option>
                                        <option value="mato grosso">
                                            MT
                                        </option>
                                        <option value="mato grosso do sul">
                                            MS
                                        </option>
                                        <option value="minas gerais">
                                            MG
                                        </option>
                                        <option value="pará">
                                            PA
                                        </option>
                                        <option value="paraíba">
                                            PB
                                        </option>
                                        <option value="paraná">
                                            PR
                                        </option>
                                        <option value="pernanbuco">
                                            PE
                                        </option>
                                        <option value="piauí">
                                            PI
                                        </option>
                                        <option value="rio de janeiro">
                                            RJ
                                        </option>
                                        <option value="rio grande do norte">
                                            RN
                                        </option>
                                        <option value="rio grande do sul">
                                            RS
                                        </option>
                                        <option value="rondônia">
                                            RO
                                        </option>
                                        <option value="roraima">
                                            RR
                                        </option>
                                        <option value="santa catarina">
                                            SC
                                        </option>
                                        <option value="são paulo">
                                            SP
                                        </option>
                                        <option value="sergipe">
                                            SE
                                        </option>
                                        <option value="tocantins">
                                            TO
                                        </option>
                                </select>
                            </div>

                            <div id="eMail">
                                <p class="title">E-mail</p>
                                <input type="text" />
                            </div>
                        </div>
                        
                        <div id="fourthy-line">
                            <div id="phone">
                                <p class="title">Telefone</p>
                                <input type="text" />                            
                            </div>

                            <div id="cellphone">
                                <p class="title">Celular</p>
                                <input type="text" />
                            </div>

                            <div id="note">
                                <p class="title">Observação</p>
                                <input type="text" />
                            </div>
                        </div>

                            <div id="final">                                
                                <div id="color">
                                    <p class="title">Cor</p>
                                    <Cor cor="#05d9f7"/>
                                </div>
                                
                                <input 
                                    type="button" 
                                    value="Salvar"
                                    onClick={this.updateDataBase}
                                />
                            </div>

                    </div>
                </div>
            </>

        )
    }
}

export default index;