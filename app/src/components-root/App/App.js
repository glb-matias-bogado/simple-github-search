//Polyfill
import 'es6-promise';

//Vendor
import React, { Component } from 'react';

//Child components
import SearchPage from '../../components-search-page/SearchPage/SearchPage';

//Global styles from bootstrap
import 'bootstrap/scss/bootstrap.scss';

export default class App extends Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="root-app">
                <div className="container">
                    <SearchPage />
                </div>
            </div>
        );
    }
}