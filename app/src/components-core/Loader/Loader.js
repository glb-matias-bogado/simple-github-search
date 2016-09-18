import React, { Component, PropTypes } from 'react'
import classNames from 'classnames';
import { i18n }from '../../core/i18n'

//Styles
import s from './Loader.scss'

class Loader extends Component {

    render () {
        return (
            <span className={this.getClassName()}>{i18n.getString('LOADER__LABEL')}</span>
        );
    }

    getClassName () {
        return classNames({
            'core-loader': true,
            [this.props.className]: (this.props.className)
        });
    }
}

export default Loader;

