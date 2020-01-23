import React, { Component } from 'react';
import Header from './../../public/header';
import Menu from '../components/Menu'

class Index extends Component{
    render() {
        return(
            <div id='todo'>
                <Header name="Menu"></Header>
                <Menu></Menu>
            </div>
        )
    };
}

export default Index;
