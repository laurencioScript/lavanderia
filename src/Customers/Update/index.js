import React, { Component } from 'react';
import Header from '../../public/header';
import { Link } from 'react-router-dom';
import MaskedInput from 'react-text-mask';

import Axios from 'axios';

import './update.css';
import Cor from '../Create/Cor';

class index extends Component{
    state = {
        Clientes: []
    }

    componentDidMount(){
        Axios.get("http://localhost:3000/client/" + sessionStorage.getItem('Selecionado'), {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}}).then(res =>{
            this.setState({Clientes: res.data.result[0]});

                
                

            this.state.Clientes.corporate_name == '' ? document.querySelector("#cpf_input").value = this.state.Clientes.cpf_cnpj : document.querySelector("#cnpj_input").value = this.state.Clientes.cpf_cnpj;

                
            document.querySelector("#razao_input").value = this.state.Clientes.corporate_name;
            document.querySelector("#name_input").value = this.state.Clientes.name_client;
            document.querySelector("#email_input").value = this.state.Clientes.email;
            document.querySelector("#observacao_input").value = this.state.Clientes.observation_description;
            
            document.querySelector("#logra_input").value = this.state.Clientes.address_client;
            document.querySelector("#numero_input").value = this.state.Clientes.phone_number;
            document.querySelector("#complemento_input").value = this.state.Clientes.complement;
            document.querySelector("#bairro_input").value = this.state.Clientes.neighborhood;
            document.querySelector("#cidade_input").value = this.state.Clientes.city;
            document.querySelector("#estado_input").value = this.state.Clientes.state_city;

            document.querySelector('#telefone_input').value = this.state.Clientes.contact[0] == undefined ? '' : this.state.Clientes.contact[0];
            console.log(this.state.Clientes.contact);
            document.querySelector('#celular_input').value = this.state.Clientes.contact[1] == undefined ? '' : this.state.Clientes.contact[1];
        });
    }
    updateDataBase(){
        var contato;
        if(document.querySelector("#telefone_input").value == ''){
            contato = [document.querySelector("#celular_input").value.replace(/\D/g, "")];
        }else if(document.querySelector("#celular_input").value == ''){
            contato = [document.querySelector("#telefone_input").value.replace(/\D/g, "")];
        }else{
            contato = [document.querySelector("#telefone_input").value.replace(/\D/g, ""), document.querySelector("#celular_input").value.replace(/\D/g, "")];
        }
        var data = {
            "info":{
                "cpf_cnpj": document.querySelector("#cnpj_input").value == '' ? document.querySelector("#cpf_input").value : document.querySelector("#cnpj_input").value ,
                "type_client": 'j',
                "name_client": document.querySelector("#name_input").value,
                "corporate_name": document.querySelector("#razao_input").value,
                "email": document.querySelector("#email_input").value,
                "observation_description": document.querySelector("#observacao_input").value,
                "observation_color": '#ffffff',
                "contact": contato
            },"end":{
                "address_client": document.querySelector("#logra_input").value,                
                "number": document.querySelector("#numero_input").value,                
                "complement": document.querySelector("#complemento_input").value,                
                "neighborhood": document.querySelector("#bairro_input").value,                
                "city": document.querySelector("#cidade_input").value,                
                "state_city": document.querySelector("#estado_input").value,                
                "cep": 'a',                
            }
        }

        Axios.put("http://localhost:3000/client/" + sessionStorage.getItem('Selecionado'), data, {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}}).then(res => {
                document.querySelector("#cnpj_input").value = '';
                document.querySelector("#name_input").value = '';
                document.querySelector("#razao_input").value = '';
                document.querySelector("#email_input").value = '';
                document.querySelector("#observacao_input").value = '';
                
                document.querySelector("#telefone_input").value= '';
                document.querySelector("#logra_input").value = '';
                document.querySelector("#numero_input").value = '';
                document.querySelector("#complemento_input").value = '';
                document.querySelector("#bairro_input").value = '';
                document.querySelector("#cidade_input").value = '';
                document.querySelector("#estado_input").value = '';
        });


        console.log("FOI");
        // Axios.put("http://localhost:3000/client/" + sessionStorage.getItem('Selecionado'), {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}}).then(res => {
        // })
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
                                <input type="text" id='name_input' />
                            </div>
                            <div id="corporateName">
                                <p class="title">Razão Social</p>
                                <input type="text" id='razao_input' />
                            </div>
                            <div id="CNPJ">
                                <p class="title">CNPJ</p>
                                <MaskedInput
                                    mask={[/[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/ , '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                                    guide={false}
                                    keepCharPositions={true}
                                    id='cnpj_input'
                                />
                            </div>
                        </div>
                        
                        <div id="secondLine">
                            <div id="CPF">
                                <p class="title">CPF</p>
                                <MaskedInput
                                    mask={[/[1-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                                    guide={false}
                                    keepCharPositions={true}
                                    id='cpf_input'                                    
                                />
                            </div>

                            <div id="publicPlace">
                                <p class="title">Logradouro</p>
                                <input type="text" id='logra_input' />
                            </div>

                            <div id="number">
                                <p class="title">Número</p>
                                <input type="text" id='numero_input' />
                            </div>
                            <div id="complement">
                                <p class="title">Complemento</p>
                                <input type="text" id='complemento_input' />
                            </div>
                        </div>
                        
                        <div id="third-line">
                            <div id="neighborhood">
                                <p class="title">Bairro</p>
                                <input type="text" id='bairro_input' />
                            </div>

                            <div id="city">
                                <p class="title">Cidade</p>
                                <input type="text" id='cidade_input' />
                            </div>

                            <div id="state">
                                <p class="title">Estado</p>
                                <select id='estado_input' >
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
                                <input type="text" id='email_input' />
                            </div>
                        </div>
                        
                        <div id="fourthy-line">
                            <div id="phone">
                                <p class="title">Telefone</p>
                                <MaskedInput
                                    mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={true}
                                    keepCharPositions={true}
                                    id='telefone_input'
                                />

                            </div>

                            <div id="cellphone">
                                <p class="title">Celular</p>
                                <MaskedInput
                                    mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={false}
                                    keepCharPositions={true}
                                    id='celular_input'
                                    // value={this.state.Clientes.contact}
                                    onChange={() =>{
                                        console.log(document.querySelector("#celular_input").value);
                                    }}
                                />
                            </div>

                            <div id="note">
                                <p class="title">Observação</p>
                                <input type="text" id='observacao_input' />
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