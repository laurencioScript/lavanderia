import React, { Component } from 'react';
import MaskedInput from 'react-text-mask'

import icon_close from '../../../public/icons/icon_close.png';

import './CADcliente.css';

const Connection = require('../../../public/connection');

class CADcliente extends Component {
    state = {
        cpf_cnpj: '',
        type_client: 'j',
        name_client: '',
        corporate_name: '',
        email: '',
        observation_description: '',
        observation_color: '#FFFFFF',
            telefone: '',
            celular: '',

        address_client: "", 
        number: "", 
        complement: "", 
        neighborhood: "", 
        city: "", 
        state_city: "", 
        cep: ""
    }
    render() {
        return (
            <div id="quickCADcustomer-Container">
                <p>Cadastro Rápido de Clientes</p>
                <img src={icon_close} onClick={()=>{
                    document.querySelector("#quickCADcustomer-Container").style.display = "none";
                }}/>

                <div id="primeiraLinha">
                    <div>
                        <p>Nome</p>
                        <input type="text" onChange={(e)=>{this.setState({name_client: e.target.value})}}/>
                    </div>
                    <div>
                        <p>CNPJ</p>
                        <MaskedInput
                            mask={[/[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/ , '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                            guide={false}
                            keepCharPositions={true}
                            id='cnpj_input'
                            onChange={(e)=>{this.setState({cpf_cnpj: e.target.value})}}
                        />
                    </div>
                    <div>
                        <p>Razão Social</p>
                        <input type="text" onChange={(e)=>{this.setState({corporate_name: e.target.value})}}/>
                    </div>
                    <div>
                        <p>E-mail</p>
                        <input type="text" onChange={(e)=>{this.setState({email: e.target.value})}}/>
                    </div>
                </div>

                <div id="segundaLinha">
                    <div>
                        <p>CEP</p>
                        <MaskedInput
                            mask={ [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/]}
                            guide={false}
                            onChange={(e)=>{this.setState({cep: e.target.value})}}
                        />
                    </div>
                    <div>
                        <p>Endereço</p>
                        <input type="text" onChange={(e)=>{this.setState({address_client: e.target.value}, ()=>{console.log(this.state.address_client)})}}/>
                    </div>
                    <div>
                        <p>Número</p>
                        <MaskedInput 
                            mask={[ /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/ ]}
                            guide={false}
                            id="number"
                            onChange={(e)=>{this.setState({number: e.target.value})}}
                        />
                    </div>
                    <div>
                        <p>Complemento</p>
                        <input type="text" onChange={(e)=>{this.setState({complement: e.target.value})}}/>
                    </div>
                </div>

                <div id="terceiraLinha">
                    <div>
                        <p>Bairro</p>
                        <input type="text" onChange={(e)=>{this.setState({neighborhood: e.target.value})}}/>
                    </div>
                    <div>
                        <p>Cidade</p>
                        <input type="text" onChange={(e)=>{this.setState({city: e.target.value})}}/>
                    </div>
                    <div>
                        <p>Estado</p>
                        <select onChange={(e)=>{this.setState({state_city: e.target.value})}}>
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
                </div>

                <div id="quartaLinha">
                    <div>
                        <p>Telefone</p>
                        <MaskedInput
                            mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                            guide={false}
                            keepCharPositions={true}
                            id='telefone_input'
                            onChange={(e)=>{this.setState({telefone: e.target.value})}}
                        />
                    </div>
                    <div>
                        <p>Celular</p>
                        <MaskedInput
                            mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                            guide={false}
                            keepCharPositions={true}
                            id='celular_input'
                            onChange={(e)=>{this.setState({celular: e.target.value})}}
                        />
                    </div>
                </div>
            
                <div id="quintaLinha">
                    <div>
                        <p>Obervação</p>
                        <textarea onChange={(e)=>{this.setState({observation_description: e.target.value})}}/>
                    </div>
                    <div>
                        <p>COR AQUI</p>

                        <input type="button" value="Salvar"
                        
                            onClick={()=>{
                                var data = {
                                        "info":{
                                            "cpf_cnpj": this.state.cpf_cnpj,
                                            "type_client": this.state.type_client,
                                            "name_client": this.state.name_client,
                                            "corporate_name": this.state.corporate_name,
                                            "email": this.state.email,
                                            "observation_description": this.state.observation_description,
                                            "observation_color": "#FFFFFF",
                                            "contact": [
                                                this.state.telefone.replace(/\D/g, ""),
                                                this.state.celular.replace(/\D/g, "")
                                            ]

                                        },"end":{
                                            "address_client": this.state.address_client,
                                            "number": this.state.number,
                                            "complement": this.state.complement,
                                            "neighborhood": this.state.neighborhood,
                                            "city": this.state.city,
                                            "state_city": this.state.state_city,
                                            "cep": this.state.cep.replace(/\D/g, ""),
                                        }
                                };

                                console.log(data)

                                Connection.postCustomer(data);

                            }}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CADcliente;