import React, { Component } from 'react';
import Header from '../public/header';
import Users from './Users';

class Index extends Component{
    render() {
        return(
            <>
                <Header></Header>
                <Users></Users>
            </>
        );
    }
}

export default Index;