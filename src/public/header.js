import React, { Component } from 'react';
import'./header.css';
import {Link} from 'react-router-dom';

import icon_maquina from '../public/icons/icon_maquina.png';
import icon_sair from '../public/icons/icon_sair.png';

class Header extends Component{
    sair = () =>{
        sessionStorage.clear();
    }
    render(){
        return(
            <div id="header">
                <Link to='/Menu'>
                    <img src={icon_maquina} alt=" " ></img>
                </Link>

                <h1>MENU</h1>
                <Link to='/'><img src={icon_sair} alt=" " onClick={this.sair} /></Link>
            </div>
        );
    }
}

export default Header;