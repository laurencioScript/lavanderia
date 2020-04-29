import React, {useState, useContext} from 'react';
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
    const [menuOpen, setMenuOpen] = useState(false);
    const [userName, setUserName] = useState(JSON.parse(sessionStorage.getItem('user')).nome );
    const [userOcupation, setUserOcupation] = useState(JSON.parse(sessionStorage.getItem('user')).cargo );
    const [sideBarAnimation, setSideBarAnimation] = useState("");

    const openMenu = () =>{
        setMenuOpen(true);
        setSideBarAnimation("sidebarClose");
    }
    const closeMenu = () =>{
        setMenuOpen(false);
        setSideBarAnimation("");
    }
    const isMenuOpen = state =>{
        setMenuOpen(state.isOpen);
    }
    return (
        <>
        {/* É feito o encapsulamento do componente, pois é necessario para que o 
        menu feche com onMouseLevae, visto que não há nada oficial na docuemntação 
        do componente. */}
        <div onMouseLeave={closeMenu}> 
            <Menu
                customBurgerIcon={false}
                customCrossIcon={false}
                noOverlay 
                isOpen={menuOpen} 
                onStateChange={isMenuOpen}
                className="no-select">
                <a>
                    <div id="user">
                        <img src={icon_user} alt="icone de usuário" />
                        <div id="information">
                            <p >{userName}</p>
                            <p >{userOcupation}</p>
                        </div>
                    </div>
                </a>
                <a>
                    <div id="sell">
                        <img src={icon_sell} alt="icone de vendas" />
                        <p  className="no-select">Vendas</p>
                    </div>
                </a>

                <a>
                    <div id="customer">
                        <img src={icon_customer} alt="icone de clientes" />
                        <p  className="no-select">Clientes</p>
                    </div>
                </a>

                <a>
                    <div id="shirts">
                        <img src={icon_shirt} alt="icone de roupas" />
                        <p  className="no-select">Peças</p>
                    </div>
                </a>

                <a>
                    <div id="measures">
                        <img src={icon_measure} alt="icone de medidas" />
                        <p  className="no-select">Medidas</p>
                    </div>
                </a>

                <a>
                    <div id="properties">
                        <img src={icon_clipboard} alt="icone de Propriedades" />
                        <p  className="no-select">Propriedades</p>
                    </div>
                </a>
                
                <a>
                    <div id="report">
                        <img src={icon_pdf} alt="icone de relatórios" />
                        <p  className="no-select">Relatórios</p>
                    </div>
                </a>

                <a>
                    <div id="users">
                        <img src={icon_users} alt="icone de usuários" />
                        <p  className="no-select">Usuários</p>
                    </div>
                </a>

                <a>
                    <div id="logOut">
                        <img src={icon_logOut} alt="icone de Saida" />
                        <p  className="no-select">Sair</p>
                    </div>
                </a>

            </Menu>
        </div>

        
        <div id="sideBar" className={sideBarAnimation + " no-select"} onMouseOver={openMenu}>
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