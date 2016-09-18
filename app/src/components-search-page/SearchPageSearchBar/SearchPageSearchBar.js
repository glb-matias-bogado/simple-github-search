//Vendor
import React, { Component, PropTypes } from 'react';

//Child components
import Loader from '../../components-core/Loader';
import Button from '../../components-core/Button/Button';
import Input from '../../components-core/Input/Input';

//Styles
import './SearchPageSearchBar.scss'

export default class SearchBar extends Component {

    constructor (props) {
        super(props);

        this.state = {
            showInlineError: false
        };
    }

    static propTypes = {
        isLoading: PropTypes.bool,
        onSearch: PropTypes.func
    };

    static defaultProps = {
        isLoading: false
    };

    render () {
        return (
            <div className="search-page-search-bar">
                <div className="row">
                    <div className="col-sm-8">
                        <form {...this.getFormProps()}>
                            <Input {...this.getInputProps()} />
                        </form>
                        {this.renderInlineError()}
                    </div>
                    <div className="col-sm-2">
                        <Button {...this.getButtonProps()}>Search</Button>
                    </div>
                    {this.renderLoader()}
                </div>
            </div>
        );
    }

    renderLoader () {
        return (this.props.isLoading) ? (
            <div className="col-sm-2">
                <Loader />
            </div>
        ) : null;
    }

    renderInlineError () {
        return (this.state.showInlineError) ?
            <span className="search-page-search-bar--inline-error">Enter a valid user name</span> :
            null;
    }

    getFormProps () {
        return {
            onSubmit: (event) => this.handleSearch(event),
            name: 'search-form'
        };
    }

    getInputProps () {
        return {
            ref: 'searchInput',
            type: 'text'
        };
    }

    getButtonProps () {
        return {
            onClick: (event) => this.handleSearch(event)
        };
    }

    handleSearch (event) {
        event.preventDefault();

        const inputValue = this.refs.searchInput.getValue();

        if (inputValue) {
            this.setState({showInlineError: false}, () => {
                if (this.props.onSearch) {
                    this.props.onSearch(inputValue);
                }
            });
        } else {
            this.setState({showInlineError: true});
        }
    }
}