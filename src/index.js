import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Menu from './index/Index';
// import Login from './Login';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact="true" component={App} />
            <Route path="/Menu" component={Menu} />
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));