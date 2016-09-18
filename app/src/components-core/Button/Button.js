//Vendor
import React, { Component } from 'react';

export default class Button extends Component {

    constructor (props) {
        super(props);
    }

    render () {
        return <button {...this.getProps()}>{this.props.children}</button>;
    }

    getProps () {
        return Object.assign({}, this.props, {
            className: 'btn btn-primary',
            type: 'button'
        })
    }
}