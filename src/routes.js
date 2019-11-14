import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from './Login';
import Menu from './index/Index';
import Users from './Users';

import formUser from './Users/formUser';

const localAuthentication = () =>{
    var retorno = false;
    retorno = sessionStorage.getItem("E-mail") == null ? false : true;

    return retorno;
};

const PrivateRoute = ({ component: Component , ...rest }) =>(
    <Route {...rest} render={props =>(
        localAuthentication() ? (
            <Component {...props} to={sessionStorage.clear()}/>
        ) : ( 
          <Redirect to={{ pathname: '/', state: { from: props.location}}, sessionStorage.setItem('message', "Você não está Logado")}/>
        )
    )}/>
)

const Routes = ()=> (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login} />
            <PrivateRoute path='/Menu' component={Menu}/>
            <PrivateRoute path='/Usuarios' component={Users}/>
            <Route path='/formUser' component={formUser} />
        </Switch>
    </BrowserRouter>
);

export default Routes;