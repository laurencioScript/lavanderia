import React, {Component} from 'react';

import './piecesReadjustment.css';
import Axios from 'axios';

class piecesReadjustment extends Component{
    state = {
        Pecas: []
    }
    componentDidMount(){
        Axios.get('http://localhost:3000/piece', {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}}).then(res => {
           var Pecas = res.data;
           const result = Pecas.result;            
           Pecas = result;

           this.setState({Pecas});
       });
    }

    updateAllPieces(){
        var reajuste = document.querySelector("#piecesReadjustment-Number").value;
        this.state.Pecas.map(Pecas =>{
            var data = {
                "name": Pecas.piece_name,
                "unity": Pecas.unity,
                "value": Pecas.value + (Pecas.value * (reajuste / 100))
            }
            Axios.put("http://localhost:3000/piece/" + Pecas.id_piece, data, {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}});
        })
    }
    updateOnePiece(peca){
        var reajuste = document.querySelector("#piecesReadjustment-Number").value;

        var sla = this.state.Pecas.find(element => element.id_piece == peca);

        var data = {
            "name": sla.peca,
            "unity": sla.unidade,
            "value": sla.valor + (sla.valor * (reajuste / 100))
        }
        console.log(peca);
        Axios.put("http://localhost:3000/piece/" + peca, data, {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}})
    }

    montaSelect(){
        var option =        
        this.state.Pecas.map(Pecas =>
            <option value={Pecas.id_piece}>
                {Pecas.piece_name}
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