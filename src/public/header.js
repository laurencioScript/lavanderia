import React, { Component } from 'react';
import'./header.css';

import img_placeholder from "./placeholder-img.jpg";

class Header extends Component{
    render(){
        return(
            <div id="header">
                <img src={img_placeholder}></img>

                <h1>MENU</h1>

                <img src={img_placeholder}></img>
            </div>
        );
    }
}

export default Header;