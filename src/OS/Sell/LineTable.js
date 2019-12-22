import React, { Component } from 'react';
import Axios from 'axios';
import Select from 'react-select';
import makeAnimated from'react-select/animated';

import icon_close from '../../public/icons/icon_close.png';

const animatedComponents = makeAnimated();

class LineTable extends Component {
    state = {
        id: this.props.iten,
        Pecas: [],
        Cores: [],
        Caract: [],
        Defeitos: [],

        Option:{
            Pecas: [],
            Cores: [],
            Caract: [],
            Defeitos: []
        },

        SelectedOption: null
    }
    componentDidMount(){
        var Pecas;
        var Cores;
        var Caract;
        var Defeitos;
        
        Axios.get('http://localhost:3000/piece').then(resA => {
            Pecas = resA.data.result[0];
            this.setState({Pecas});
            this.montaOption();
        });
        Axios.get('http://localhost:3000/color').then(resB => {
            Cores = resB.data.result[0];
            this.setState({Cores});
            this.montaOption();
        });
        Axios.get('http://localhost:3000/characteristic').then(resC => {
            Caract = resC.data.result[0];
            this.setState({Caract});
            this.montaOption();
        });
        Axios.get('http://localhost:3000/defect').then(resD => {
            Defeitos = resD.data.result[0];
            this.setState({Defeitos});
            this.montaOption();
        });

    }
    
    montaOption(){
        var Option = {
            Pecas: [],
            Cores: [],
            Caract: [],
            Defeitos: []
        };

        this.state.Pecas.map(Peca =>{            
            Option.Pecas.push({value: Peca, label: Peca.peca});
        });
        this.state.Cores.map(cor =>{
            Option.Cores.push({value: cor, label: cor.cor_nome});
        });
        this.state.Caract.map(caract =>{
            Option.Caract.push({value: caract, label: caract.caracteristica});
        });
        this.state.Defeitos.map(Defeitos =>{
            Option.Defeitos.push({value:  Defeitos, label: Defeitos.defeito });
        });

        this.setState({Option})
    }
    
    handleChange = SelectedOption =>{
        this.setState({SelectedOption}, () => {
            this.mudaTexto();
        });
    }
    mudaTexto = () => {
        document.querySelector("#id-" + this.state.id).querySelector("#unidade").innerHTML = this.state.SelectedOption == null ? " " : this.state.SelectedOption.value.unidade;
        document.querySelector("#id-" + this.state.id).querySelector("#prec_Unit").innerHTML = this.state.SelectedOption == null ? "R$ --" : "R$ " + this.state.SelectedOption.value.valor;
        document.querySelector("#id-" + this.state.id).querySelector("#prec_total").innerHTML = this.state.SelectedOption  == null ? "R$ --" : "R$ " + this.state.SelectedOption.value.valor * document.querySelector("#id-" + this.state.id).querySelector("#numberQTD").value;       
    }

    render() {
        return (
            <tr id={"id-" + this.state.id}>
                <td><img src={icon_close} id="sellTableClose" /></td>
                <td>
                    <Select 
                        options={this.state.Option.Pecas } 
                        onChange={this.handleChange} 
                        value={this.state.SelectedOption} 
                    />
                </td>
                <td><Select isMulti components={animatedComponents} closeMenuOnSelect={false} options={this.state.Option.Cores}/></td>
                <td><Select isMulti components={animatedComponents} closeMenuOnSelect={false} options={this.state.Option.Caract}/></td>
                <td><Select isMulti components={animatedComponents} closeMenuOnSelect={false} options={this.state.Option.Defeitos}/></td>                        
                <td></td>
                <td><input type="number" defaultValue="1" min="1" id="numberQTD" onChange={this.mudaTexto}/></td>
                <td id="unidade"></td>
                <td id="prec_Unit">R$ {}</td>
                <td id="prec_total">R$ {}</td>
            </tr>
        );
    }
}

export default LineTable;