import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from './Login';
import Menu from './index/Index';
import Users from './Users';
import Pieces from './pieces';
import Medidas from './Measures';
import Cores from './Colors';
import Defeitos from './Defect';
import Caract from './Features';
// import Clientes from './Clients';
// import OS from './OS';
// import Relatorios from './report';

const localAuthentication = () =>{
    var retorno = false;
    retorno = sessionStorage.getItem("email") == null ? false : true;

    return retorno;
};

const PrivateRoute = ({ component: Component , ...rest }) =>(
    <Route {...rest} render={props =>(
        localAuthentication() ? (
            <Component {...props} />
        ) : ( 
          <Redirect to={{ pathname: '/', state: { from: props.location}}}/>
        )
    )}/>
)

const Routes = ()=> (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login} />
            <PrivateRoute path='/Menu' component={Menu}/>
            <PrivateRoute path='/Usuarios' component={Users}/>
            <PrivateRoute path='/Pecas' component={Pieces}/>
            <PrivateRoute path='/Medidas' component={Medidas}/>
            <PrivateRoute path='/Cores' component={Cores}/>
            <PrivateRoute path='/Defeitos' component={Defeitos}/>
            <PrivateRoute path='/Caracteristicas' component={Caract}/>
            {/* <PrivateRoute path='/Clientes' component={Clientes}/>
            <PrivateRoute path='/OS' component={OS}/>
            <PrivateRoute path='/Relatorios' component={Relatorios}/> */}
        </Switch>
    </BrowserRouter>
);

export default Routes;