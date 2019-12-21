import React, { Component } from 'react';
import Axios from 'axios';

import icon_close from '../../public/icons/icon_close.png';

class Selltable extends Component {

    state = {
        Pecas: [],
        Cores: [],
        Caract: [],
        Defeitos: []
    }

    componentDidMount(){
        var Pecas;
        var Cores;
        var Caract;
        var Defeitos;

        Axios.get('http://localhost:3000/piece').then(res => {
            Pecas = res.data.result[0];
        });
        Axios.get('http://localhost:3000/color').then(res => {
            Cores = res.data.result[0];
        });
        Axios.get('http://localhost:3000/characteristic').then(res => {
            Caract = res.data.result[0];
        });
        Axios.get('http://localhost:3000/defect').then(res => {
            Defeitos = res.data.result[0];
        });
        
        this.setState({
            Pecas,
            Cores,
            Caract,
            Defeitos
        });
    }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td>Peças</td>
                        <td>Cores</td>
                        <td>Caracteristicas</td>
                        <td>Defeitos</td>
                        <td>Identificação</td>
                        <td>Qtd</td>
                        <td>Unidade</td>
                        <td>Val_Unit</td>
                        <td>Val_Parcial</td>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>{icon_close}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
                
            </table>
        );
    }
}

export default Selltable;