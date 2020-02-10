import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { localAuthentication } from './auth';
// import ScreensOrdemServi from './ServiceOrder/screens/index';
import ScreensHome from './screens/screenHome';
import ScreensMenu from './screens/screenMenu';
import ScreensUser from './screens/screenUser';
import ScreensSaleList from './screens/screenSaleList';
import ScreensSell from './screens/screenSell';
import ScreensColor from './screens/screenColor';
import ScreensMeasure from './screens/screenMeasures';
import ScreensDefeito from './screens/screenDefect';
// import ScreensPiece from './screenPiece';
// import ScreensClientes from './screenClient';
// import ScreensCharact from './Characteristic/screens/index';
// import ScreensRelatorios from './Reports/screens/report';
// import ScreensUnity from './Unity/screens/';

const PrivateRoute = ({ component: Component, levelRequired: levelRequired, ...rest }) => 
(

    <Route {...rest} render={props => (
         localAuthentication(levelRequired) ?
            (<Component {...props} />)
            :
            (<Redirect to="/" />)
    )}

    />
)

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={ScreensHome} />
            <PrivateRoute path='/Menu' levelRequired="3" component={ScreensMenu} />
            <PrivateRoute path='/Usuarios' levelRequired="2" component={ScreensUser} />
            <PrivateRoute exact path='/Vendas' levelRequired="3" component={ScreensSaleList}/>
            <PrivateRoute path='/Vendas/criar' levelRequired="3" component={ScreensSell}/>
            <PrivateRoute path='/Cores' levelRequired="3" component={ScreensColor}/>
            <PrivateRoute path='/Medidas' levelRequired="3" component={ScreensMeasure}/>
            <PrivateRoute path='/Defeitos' levelRequired="3" component={ScreensDefeito}/>
            {/*<PrivateRoute path='/Pecas' levelRequired="3" component={ScreensPiece} />
            <PrivateRoute path='/Clientes' levelRequired="3" component={ScreensClientes} />
            */}
            {/* <PrivateRoute path='/Caracteristicas' component={ScreensCharact}/>
            <PrivateRoute path='/Relatorios' component={ScreensRelatorios}/> */} 
        </Switch>
    </BrowserRouter>);

export default Routes;