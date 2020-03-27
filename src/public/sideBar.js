import React, {useState, useEffect} from 'react';
import {Link, Redirect, useHistory} from 'react-router-dom';
import { render } from 'react-dom';
import {bubble as Menu} from 'react-burger-menu';

import './sideBar.css';
import './teste.css';
import icon_user from './icons/userWhite.svg';
import icon_sell from './icons/icon vendas.svg';
import icon_customer from './icons/icon clientes.svg';
import icon_shirt from './icons/icon shirt.svg';
import icon_measure from './icons/medida.svg';
import icon_clipboard from './icons/clipboard.svg';
import icon_pdf from './icons/icon pdf.svg';
import icon_users from './icons/users.svg';
import icon_logOut from './icons/logout.svg';

function SideBar(){
    const [selected, setSelected] = useState('');
    const [userName, setUserName] = useState(JSON.parse(sessionStorage.getItem('user')).nome );
    const [userOcupation, setUserOcupation] = useState(JSON.parse(sessionStorage.getItem('user')).cargo );
    const [textVisible, setTextVisible] = useState("");

    return (
        <>
        <Menu>  
            <a>
                <div id="user">
                    <img src={icon_user} alt="icone de usuário" />
                    <div id="information">
                        <p class="no-select">{userName}</p>
                        <p class="no-select">{userOcupation}</p>
                    </div>
                </div>
            </a>
            <a>
                <div id="sell">
                    <img src={icon_sell} alt="icone de vendas" />
                    <p  class="no-select">Vendas</p>
                </div>
            </a>

            <a>
                <div id="customer">
                    <img src={icon_customer} alt="icone de clientes" />
                    <p  class="no-select">Clientes</p>
                </div>
            </a>

            <a>
                <div id="shirts">
                    <img src={icon_shirt} alt="icone de roupas" />
                    <p  class="no-select">Peças</p>
                </div>
            </a>

            <a>
                <div id="measures">
                    <img src={icon_measure} alt="icone de medidas" />
                    <p  class="no-select">Medidas</p>
                </div>
            </a>

            <a>
                <div id="properties">
                    <img src={icon_clipboard} alt="icone de Propriedades" />
                    <p  class="no-select">Propriedades</p>
                </div>
            </a>
            
            <a>
                <div id="report">
                    <img src={icon_pdf} alt="icone de relatórios" />
                    <p  class="no-select">Relatórios</p>
                </div>
            </a>

            <a>
                <div id="users">
                    <img src={icon_users} alt="icone de usuários" />
                    <p  class="no-select">Usuários</p>
                </div>
            </a>

            <a>
                <div id="logOut">
                    <img src={icon_logOut} alt="icone de Saida" />
                    <p  class="no-select">Sair</p>
                </div>
            </a>

            
        </Menu>


        <div id='sideBar' class="bm-burguer-button">
            <div id="user">
                <img src={icon_user} alt="icone de usuário" />
            </div>

            <div id="sell">
                <img src={icon_sell} alt="icone de vendas" />
            </div>

            <div id="customer">
                <img src={icon_customer} alt="icone de clientes" />
            </div>

            <div id="shirts">
                <img src={icon_shirt} alt="icone de roupas" />
            </div>

            <div id="measures">
                <img src={icon_measure} alt="icone de medidas" />
            </div>

            <div id="properties">
                <img src={icon_clipboard} alt="icone de Propriedades" />
            </div>

            <div id="report">
                <img src={icon_pdf} alt="icone de relatórios" />
            </div>

            <div id="users">
                <img src={icon_users} alt="icone de usuários" />
            </div>


            <div id="logOut">
                <img src={icon_logOut} alt="icone de Saida" />
            </div>

        </div>
        </>
    );
}

export default SideBar;