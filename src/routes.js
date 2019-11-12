import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from './Login';
import Menu from './index/Index';
import Users from './Users';

const localAuthentication = () =>{
    var retorno = false;
    retorno = sessionStorage.getItem("E-mail") == null ? false : true;

    return retorno;
};

const PrivateRoute = ({ component: Component , ...rest }) =>(
    <Route {...rest} render={props =>(
        localAuthentication() ? (
            <Component {...props} />
        ) : ( 
          <Redirect to={{ pathname: '/', state: { from: props.location, Message: 'Você não está logado' }}} />
        )
    )}/>
)

const Routes = ()=> (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login} />
            <PrivateRoute path='/Menu' component={Menu}/>
            <PrivateRoute path='/Usuarios' component={Users}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;