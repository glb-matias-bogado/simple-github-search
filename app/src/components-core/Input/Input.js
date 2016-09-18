//Vendor
import React, { Component } from 'react';

export default class Input extends Component {

    constructor (props) {
        super(props);
    }

    render () {
        return <input {...this.getProps()} />;
    }

    getProps () {
        return Object.assign({}, this.props, {
            ref: 'input',
            className: 'core-input form-control'
        });
    }

    getValue () {
        return this.refs.input.value;
    }
}