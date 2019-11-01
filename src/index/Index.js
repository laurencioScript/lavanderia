import React, { Component } from 'react';
import Header from '../public/header';
import Menu from './Menu'

class Index extends Component{
    render() {
        return(
            <>
                <Header></Header>
                <Menu></Menu>
            </>
        )
    };
}

export default Index;
