import React, {Component} from 'react';

import './piecesReadjustment.css';


const Connection = require('../public/connection');

class piecesReadjustment extends Component{
    state = {
        Pecas: [],
        checkBox: false
    }
    componentDidMount(){
        Connection.getPieces().then(res => {
        // Axios.get('http://localhost:3000/piece', {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}})
           this.setState({Pecas: res});
       });
    }

    updateAllPieces(){
        var reajuste = document.querySelector("#piecesReadjustment-Number").value;
        this.state.Pecas.map(Pecas =>{
            var data = {
                "name": Pecas.piece_name,
                "unity": Pecas.unity,
                "value": parseFloat(Pecas.value) + (parseFloat(Pecas.value) * (reajuste / 100))
            }
            Connection.putPiece(Pecas.id_piece, data);
            // Axios.put("http://localhost:3000/piece/" + Pecas.id_piece, data, {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}});
        })
    }
    updateOnePiece(id){
        var reajuste = document.querySelector("#piecesReadjustment-Number").value;
        
        var peca = this.state.Pecas.find(element => element.id_piece == id);
        var data = {
            "name": peca.piece_name,
            "unity": peca.unity,
            "value": parseFloat(peca.value) + (parseFloat(peca.value) * (reajuste / 100))
        }
        Connection.putPiece(id, data);
        // Axios.put("http://localhost:3000/piece/" + peca, data, {headers: {Authorization: "Bearer " +sessionStorage.getItem("Token")}})
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
                        <input type='checkbox' name='todas' id="checkTodas"
                            onChange={()=>{
                               document.querySelector("#piecesReadjustment-select").disabled =  !document.querySelector("#piecesReadjustment-select").disabled;
                            }} />
                        <label for='todas'>Todas</label>
                    </div>

                    <select id="piecesReadjustment-select">
                        <option value="null" >---</option>
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
                                if(document.querySelector("#checkTodas").checked)
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