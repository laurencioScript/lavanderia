import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Menu from './index/Index';
import Users from './Users';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact="true" component={App} />
            <Route path="/Menu" component={Menu} />
            <Route path="/Usuarios" component={Users} />
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));