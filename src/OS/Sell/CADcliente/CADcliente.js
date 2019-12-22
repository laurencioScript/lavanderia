import React, { Component } from 'react';


import icon_close from '../../../public/icons/icon_close.png';

import './CADcliente.css';

class CADcliente extends Component {
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
                        <input type="text" />
                    </div>
                    <div>
                        <p>CNPJ</p>
                        <input type="text" />
                    </div>
                    <div>
                        <p>Razão Social</p>
                        <input type="text" />
                    </div>
                    <div>
                        <p>E-mail</p>
                        <input type="text" />
                    </div>
                </div>

                <div id="segundaLinha">
                    <div>
                        <p>CEP</p>
                        <input type="text" />
                    </div>
                    <div>
                        <p>Endereço</p>
                        <input type="text" />
                    </div>
                    <div>
                        <p>Número</p>
                        <input type="number" 
                            style={{
                                WebkitAppearance: "none",
                                margin: 0,

                                MozAppearance: "textfield"
                            }}
                        />
                    </div>
                    <div>
                        <p>Complemento</p>
                        <input type="text" />
                    </div>
                </div>

                <div id="terceiraLinha">
                    <div>
                        <p>Bairro</p>
                        <input type="text" />
                    </div>
                    <div>
                        <p>Cidade</p>
                        <input type="text" />
                    </div>
                    <div>
                        <p>Estado</p>
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
                </div>

                <div id="quartaLinha">
                    <div>
                        <p>Telefone</p>
                        <input type="text" />
                    </div>
                    <div>
                        <p>Celular</p>
                        <input type="text" />
                    </div>
                </div>
            
                <div id="quintaLinha">
                    <div>
                        <p>Obervação</p>
                        <textarea />
                    </div>
                    <div>
                        <p>COR AQUI</p>

                        <input type="button" value="Salvar"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CADcliente;