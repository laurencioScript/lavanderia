import React, {Component} from 'react';

import './piecesReadjustment.css';
import Axios from 'axios';

class piecesReadjustment extends Component{
    state = {
        Pecas: []
    }
    componentDidMount(){
        Axios.get('http://localhost:3000/piece').then(res => {
           var Pecas = res.data;
           const result = Pecas.result;            
           Pecas = result[0];

           this.setState({Pecas});
       });
    }

    updateAllPieces(){
        var reajuste = document.querySelector("#piecesReadjustment-Number").value;
        this.state.Pecas.map(Pecas =>{
            var data = {
                "peca": Pecas.peca,
                "unidade": Pecas.unidade,
                "valor": Pecas.valor + (Pecas.valor * (reajuste / 100))
            }
            Axios.put("http://localhost:3000/piece/" + Pecas.id_peca, data);
        })
    }
    updateOnePiece(peca){
        var reajuste = document.querySelector("#piecesReadjustment-Number").value;

        var sla = this.state.Pecas.find(element => element.id_peca == peca);

        var data = {
            "peca": sla.peca,
            "unidade": sla.unidade,
            "valor": sla.valor + (sla.valor * (reajuste / 100))
        }
        Axios.put("http://localhost:3000/piece/" + peca, data)
    }

    montaSelect(){
        var option =        
        this.state.Pecas.map(Pecas =>
            <option value={Pecas.id_peca}>
                {Pecas.peca}
            </option>
        );

        return option
    }

    render(){
        return(
            <div id='piecesReadjustment-container'>
                <div id='piecesReadjustment-content'>
                    <p>Reajuste</p>

                    <div id='piecesReadjustment-first'>
                        <p>Peça</p>
                        <input type='checkbox' name='todas'/>
                        <label for='todas'>Todas</label>
                    </div>

                    <select id="piecesReadjustment-select">
                        <option value="null">---</option>
                        { this.montaSelect() }
                    </select>

                    <div id='piecesReadjustment-second'>
                        <p>Valor do Reajuste: </p>
                        <input type='number'
                            id="piecesReadjustment-Number"
                            min='1'
                            max='100'
                        />
                    </div>

                    <div id='piecesReadjustment-buttons'>
                        <input type='button'
                            id='save'
                            value='Salvar'
                            onClick={() =>{
                                if(document.querySelector("#piecesReadjustment-select").value == "null")
                                    this.updateAllPieces();
                                else
                                    this.updateOnePiece(document.querySelector("#piecesReadjustment-select").value);
                                    
                            }}
                        />
                        <input type='button'
                            id='cancel'
                            value='Cancelar'
                            onClick={() =>{
                                document.querySelector('#piecesReadjustment-container').style.display = "none"; 
                            }}
                        />
                    </div>
                </div>

            </div>
        )
    }
}

export default piecesReadjustment;