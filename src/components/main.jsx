import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Outlet />
            </div>
        )
    }
}