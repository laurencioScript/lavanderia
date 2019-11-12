import React, { Component } from 'react';


class tableLine extends Component{
    state = {
        Id: this.props.Id,
        Estado: false,
    }

    

    render() {
        return(
            <>
                <td>{this.props.Nome}</td>
                <td>{this.props.Email}</td>
                <td>{this.props.Nivel}</td>
            </>
        )
    }
}

export default tableLine;