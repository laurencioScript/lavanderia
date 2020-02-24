import React, { useState, useEffect } from 'react';
import MaskedInput from 'react-text-mask'


import Select from 'react-select';
import './sellFastRegisterClient.css';
import ClienteService from './../service/ClienteService';


function RegisterClient(props) {

    const [cliente, setCliente] = useState({
            cpf_cnpj:"",
            type_client:"",
            name_client:"",
            corporate_name:"",
            email:"",
            observation_description:"",
            observation_color:"",
            contact:[],
            address_client:"",
            number:"",
            complement:"",
            neighborhood:"",
            city:"",
            state_city:"",
            cep:""
        }
    );

    const [typeClient, setTypeClient] = useState([{value:"Pessoa Fisica",label:"Pessoa Fisica"},{value:"Pessoa Juridica",label:"Pessoa Juridica"}]);
    const [selectedClient, setSelectedClient] = useState("");
    const [viewClienteEnable, setViewClienteEnable] = useState(false);
    const [inputContatos, setInputContatos] = useState("");
    

    useEffect(()=>{ setViewClienteEnable(props.viewNewClient); },[props])

    const setContatos = ()=>{
        cliente.contact.push(inputContatos);
        setCliente(cliente);
        setInputContatos("");
    }

    const changeTypeClient = (selectedType)=>{
        setSelectedClient(selectedType);
        cliente.type_client = selectedType == "Pessoa Fisica" ? "F" : "J";
        setCliente(cliente);
    }

    const saveClient = ()=>{
        ClienteService.postCustomer(cliente);
        props.updateClients();setViewClienteEnable(false);
        props.closeViewFunction(false);
    }

    return (
        <div  id="quickCADcustomer-Container" hidden={!viewClienteEnable}  >
            
            <div style={{display:"flex",alignItems: "center",justifyContent:"space-around", paddingBottom: "35px"}}>
                <h2>Cadastro Rápido de Clientes</h2> 
                <div style={{width:"40%"}}>
                    <Select  options={typeClient} onChange={(selectedType)=>{changeTypeClient(selectedType) } }  placeholder={"Tipo de Pessoa"} />           
                </div>
            </div>

            <div style={{display:"flex"}}>
                <div style={{padding:"15px 15px"}}>
                    <p>Nome</p>
                    <input type="text" onChange={(e)=>{ cliente.name_client = e.target.value; setCliente(cliente)}}/>
                </div>

                <div style={{padding:"15px 15px"}} hidden={!selectedClient}>
                    <p>{selectedClient && selectedClient.value == "Pessoa Juridica" ? "CNPJ" :"CPF"}</p>
                    <MaskedInput
                        mask={[/[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/ , '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                        guide={false}
                        keepCharPositions={true}
                        id='cnpj_input'
                        onChange={(e)=>{cliente.cpf_cnpj = e.target.value; setCliente(cliente)}}
                    />
                </div>

                <div style={{padding:"15px 15px"}} hidden={!(selectedClient && selectedClient.value == "Pessoa Juridica")}>
                    <p>Razão Social</p>
                    <input type="text" onChange={(e)=>{cliente.info.corporate_name = e.target.value; setCliente(cliente)}}/>
                </div>
                
            </div>
            

            <div style={{display:"flex"}}>

                <div style={{padding:"15px 15px"}}>
                    <p>Contato</p>
                    <MaskedInput
                        mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        guide={false}
                        keepCharPositions={true}
                        id='celular_input'
                        onChange={(e)=>{setInputContatos(e.target.value)}}
                        value={inputContatos}
                    />
                    <button onClick={()=>{setContatos()}}>Add</button>
                </div>

                <div style={{padding:"15px 15px",width:"50%"}}>
                    <p>Contatos</p>
                    <label>{JSON.stringify(cliente.contact)}</label>
                </div>
            </div>

            <div>
                <div style={{padding:"15px 15px",width:"100%"}}>
                    <p>E-mail</p>
                    <input type="text" onChange={(e)=>{cliente.email = e.target.value; setCliente(cliente)}}></input>
                </div>
            </div>
        
            <div>
                <div style={{padding:"15px 15px",width:"100%"}}>
                    <p>Obervação</p>
                    <textarea style={{width:"50%"}} onChange={(e)=>{cliente.observation_description = e.target.value; setCliente(cliente)}}/>
                </div>
            </div>

            <div style={{display:"flex",justifyContent:"flex-end"}}>
                <button type="button" style={{backgroundColor:"red",color:"white",marginRight:"10px"}}  onClick={()=>{setViewClienteEnable(false);props.closeViewFunction(false)} }>Cancelar</button>
                <button type="button" onClick={()=>{  saveClient()   }}>Salvar</button>
            </div>
        </div>
    );
    
}

export default RegisterClient;