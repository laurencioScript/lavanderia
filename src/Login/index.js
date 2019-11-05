import React from 'react';
import './index.css';
import img_placeholder from "../public/placeholder-img.jpg";

function Index() {
    return(
        
        <div id="login">
            <div id="container">
                <div id="logo-login">
                    <img src={img_placeholder} alt=""/>
                </div>

                <div id="form-login">
                    <form>       
                        <div>
                            <img src={img_placeholder} alt=" "/>
                            <input 
                                type="text" 
                                placeholder="Usuário" />
                        </div>

                        <div>
                            <img src={img_placeholder} alt=" "/>
                            <input 
                                type="password" 
                                placeholder="Senha" />
                        </div>
                        
                        <input 
                            type="submit" 
                            value="ENTRAR" id="btn-login"/>
                    </form>                
                </div>
            </div>
        </div>
    );
}

export default Index;