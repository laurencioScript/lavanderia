import React, {Component} from 'react';
import  { CirclePicker } from 'react-color';

class bolinha extends Component{
    state={
        cor: this.props.cor,
    }
    render(){
        return(
            <div id='rounded-color'>
                <CirclePicker colors={[this.props.cor]}/>
            </div>
        )
    }
}

export default bolinha;