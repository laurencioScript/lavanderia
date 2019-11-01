import React, { Component } from 'react';
import './Menu.css';
import img_placeholder from '../public/placeholder-img.jpg';

class Menu extends Component{
    render() {
        return(
            <div id='container'>
                <div id="content">
                    <div id='OS'>
                        <img src={img_placeholder} alt=" "></img>
                        <p>Serviços</p>
                    </div>

                    <div id='segunda-linha'>
                        <div id='relatorios'>
                            <img src={img_placeholder} alt=" "></img>
                            <p>Relatorios</p>
                        </div>
                        <div id='cliente'>
                            <img src={img_placeholder} alt=" "></img>
                            <p>Cliente</p>
                        </div>
                    </div>

                    <div id='controles'>
                        <div id='pecas'>
                            <img src={img_placeholder} alt=" "></img>
                            <p>Peças</p>
                        </div>

                        <div id='medidas'>
                            <img src={img_placeholder} alt=" "></img>
                            <p>Medidas</p>
                        </div>

                        <div id='defeitos'>
                            <img src={img_placeholder} alt=" "></img>
                            <p>Defeitos</p>
                        </div>

                        <div id='cores'>
                            <img src={img_placeholder} alt=" "></img>
                            <p>Cores</p>
                        </div>

                        <div id='caracteristicas'>
                            <img src={img_placeholder} alt=" "></img>
                            <p>Caracteristicas</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu;