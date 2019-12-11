import React, {Component} from 'react';
import './cor.css';

class Cor extends Component{
    componentDidMount(){
        document.getElementById("show-color").style.backgroundColor = this.props.cor;
    }
    render(){
        return(
            <div id="show-color"></div>
        )
    }
}

export default Cor;