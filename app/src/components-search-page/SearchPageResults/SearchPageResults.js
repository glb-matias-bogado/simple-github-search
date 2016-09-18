//Vendor
import React, { Component, PropTypes } from 'react';

//Styles
import './SearchPageResults.scss'

export default class SearchPageResults extends Component {

    static propTypes = {
        searchTerm: PropTypes.string,
        repositories: PropTypes.object.isRequired //Immutable
    };

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="search-page-results">
                <div className="row">
                    <div className="col-md-12">
                        {this.renderResults()}
                    </div>
                </div>
            </div>
        );
    }

    renderResults () {
        var results = null;

        if (this.props.repositories.size) {
            results = this.renderRepositories();
        } else if (this.props.searchTerm && !this.props.isLoading) {
            results = this.renderEmptyResults();
        }

        return results;
    }

    renderEmptyResults () {
        return (
            <div className="alert alert-warning" role="alert">
                The user <strong>{this.props.searchTerm}</strong> has no public repositories on his account
            </div>
        );
    }

    renderRepositories () {
        return (
            <div className="list-group">
                {this.props.repositories.map(this.renderItem.bind(this))}
            </div>
        );
    }

    renderItem (data, index) {
        return (
            <a {...this.getLinkProps(data)} key={index}>
                <label>
                    User: {data.getIn(['owner', 'login'])}
                </label>
                <h6 className="list-group-item-heading">
                    Repository: {data.get('name')}
                </h6>
                <p className="list-group-item-text">{data.get('description')}</p>
            </a>
        );
    }

    getLinkProps (data) {
        return {
            className: 'list-group-item list-group-item-action',
            href: data.get('html_url'),
            target: '_blank',
            title: `${data.get('name')} - ${data.get('description')}`
        };
    }
}