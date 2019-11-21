import React, {Component} from 'react';
import Axios from 'axios';

class tablePieces extends Component{
    state = {
        Pieces: []
    }
     componentDidMount(){
         Axios.get('http://localhost:3000/piece').then(res => {
            var Pieces = res.data;
            const result = Pieces.result;            
            Pieces = result[0];

            this.setState({Pieces});
            console.log(Pieces);
        });
    }
    componentDidUpdate(){
        localStorage.clear();

        Axios.get('http://localhost:3000/piece').then(res => {
            var Pieces = res.data;
            const result = Pieces.result;            
            Pieces = result[0];

            this.setState({Pieces});
            console.log(Pieces);
        });
    }

    render(){
        return(
            <>
                <table>
                <thead>
                    <tr>
                        <th>Peça</th>
                        <th>Unidade</th>
                        <th>Valor $</th>
                    </tr>
                </thead>
                <tbody>{
                this.state.Pieces.map(Pieces => 
                    <tr onClick={() => {
                        
                    }} id={Pieces.id_usuario}>
                        <td id="pices-name">{Pieces.peca}</td>
                        <td id="pices-email">{Pieces.unidade}</td>
                        <td id="pieces-nivel">{Pieces.valor}</td>
                    </tr>
                )}
                </tbody>
                </table>
            </>
        )
    }
}

export default tablePieces;