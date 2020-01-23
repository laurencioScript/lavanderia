import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {localAuthentication} from './auth';
import ScreensHome from './Home/screens/home';
import ScreensMenu from './Menu/screens/Menu';
import ScreensUser from './User/screens/User';
import ScreensPiece from './Pieces/screens/Piece';
import ScreensColor from './Colors/screens/color';
import ScreensDefeito from './Defect/screens/defect';
import ScreensCharact from './Characteristic/screens/index';
import ScreensClientes from './Client/screens/client';
import ScreensOrdemServi from './ServiceOrder/screens/index';
import ScreensRelatorios from './Reports/screens/report';
// import ScreensUnity from './Unity/screens/';

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
            <Route exact path='/' component={ScreensHome} />
            <PrivateRoute path='/Menu' component={ScreensMenu}/>
            <PrivateRoute path='/Usuarios' component={ScreensUser}/>
            <PrivateRoute path='/Pecas' component={ScreensPiece}/>
            <PrivateRoute path='/Cores' component={ScreensColor}/>
            <PrivateRoute path='/Defeitos' component={ScreensDefeito}/>
            <PrivateRoute path='/Caracteristicas' component={ScreensCharact}/>
            <PrivateRoute path='/Clientes' component={ScreensClientes}/>
            <PrivateRoute path='/Vendas' component={ScreensOrdemServi}/>
            <PrivateRoute path='/Relatorios' component={ScreensRelatorios}/>
            {/* <PrivateRoute path='/Medidas' component={Medidas}/> */}
        </Switch>
    </BrowserRouter>
);

export default Routes;