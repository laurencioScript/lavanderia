import React from 'react';
import './index.css';
import img_placeholder from "../public/placeholder-img.jpg";

function Index() {
    return(
        <div id="container">
            <div id="logo-login">
                <img src={img_placeholder} alt=""/>
            </div>

            <div id="form-login">
                <form>
                    <img src={img_placeholder} alt=""/>
                    
                    <input 
                        type="text" 
                        placeholder="Login" />
                    <input 
                        type="password" 
                        placeholder="Senha" />
                    
                    <input 
                        type="submit" 
                        value="ENTRAR"/>
                </form>                
            </div>
        </div>
    );
}

export default Index;