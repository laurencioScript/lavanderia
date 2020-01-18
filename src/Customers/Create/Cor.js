import React, {Component} from 'react';
import './cor.css';

class Cor extends Component{
    state = {
        Cor: ''
    }
    setColor = (Cor) => {
        this.setState({Cor})
    };
    
    render(){
        return(
            <div id="show-color"  style={{backgroundColor: this.state.Cor}}/>
        )
    }
}

export default Cor;