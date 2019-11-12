import React, { Component } from 'react';
import './Menu.css';
import img_placeholder from '../public/placeholder-img.jpg';


import icon_os from '../public/icons/icon_os.png';
import icon_relatorio from '../public/icons/icon_relatorio.png';
import icon_camisa from '../public/icons/icon_camisa.png';
import icon_regua from '../public/icons/icon_regua.png';
import icon_defeito from '../public/icons/icon_defeito.png';
import icon_paleta from '../public/icons/icon_paleta.png';
import icon_user from '../public/icons/icon_user.png';

class Menu extends Component{
    render() {
        return(
            <div id="menu">
                <div id='container-menu'>
                    <div id="content">
                        <div id='OS'>
                            <img src={icon_os} alt=" "></img>
                            <p>Serviços</p>
                        </div>

                        <div id='segunda-linha'>
                            <div id='relatorios'>
                                <img src={icon_relatorio} alt=" "></img>
                                <p>Relatorios</p>
                            </div>
                            
                            <div id='cliente'>
                                <img src={img_placeholder} alt=" "></img>
                                <p>Cliente</p>
                            </div>
                        </div>

                        <div id='controles'>
                            <div id='pecas'>
                                <img src={icon_camisa} alt=" "></img>
                                <p>Peças</p>
                            </div>

                            <div id='medidas'>
                                <img src={icon_regua} alt=" "></img>
                                <p>Medidas</p>
                            </div>

                            <div id='defeitos'>
                                <img src={icon_defeito} alt=" "></img>
                                <p>Defeitos</p>
                            </div>

                            <div id='cores'>
                                <img src={icon_paleta} alt=" "></img>
                                <p>Cores</p>
                            </div>

                            <div id='caracteristicas'>
                                <img src={img_placeholder} alt=" "></img>
                                <p>Caracteristicas</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="footer">
                    <div id="user">
                        <strong><p id="nv_acesso">{sessionStorage.getItem("Nivel")}</p></strong>
                        <p id="usuario">{sessionStorage.getItem("Nome")}</p>
                    </div>

                    <div id='new-user'>
                        <img src={icon_user} alt=" "></img>
                        <p>Criar Novo Usuário</p>
                    </div>
                </div>
            </div>
       )
    }
}

export default Menu;