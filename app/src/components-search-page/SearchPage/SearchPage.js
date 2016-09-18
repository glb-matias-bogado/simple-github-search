//Vendor
import React, { Component, PropTypes } from 'react';
import connect from 'react-redux/lib/components/connect'
import { List } from 'immutable';

//Child components
import SearchPageSearchBar from '../SearchPageSearchBar/SearchPageSearchBar'
import SearchPageResults from '../SearchPageResults/SearchPageResults'

//Redux action creators
import { findRepositoriesByUserRequest } from '../../redux/actions/searchPageActions'

//Service error codes
import { errorCodes } from '../../config/services';

//Styles
import './SearchPage.scss'

class SearchPage extends Component {

    constructor (props) {
        super(props);

        this.state = {
            searchTerm: null
        }
    }

    static propTypes = {
        serverErrorCode: PropTypes.string,
        isLoading: PropTypes.bool.isRequired,
        makeRepositoriesRequest: PropTypes.func.isRequired,
        repositories: PropTypes.object.isRequired //Immutable
    };

    render () {
        return (
            <div className="search-page">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <SearchPageSearchBar {...this.getSearchBarProps()} />
                    </div>
                    <div className="col-md-8 offset-md-2">
                        {this.renderResponse()}
                    </div>
                </div>
            </div>
        );
    }

    renderResponse () {
        return (!this.props.serverErrorCode) ?
            this.renderSearchResults() :
            this.renderServerError();
    }

    renderSearchResults () {
        return <SearchPageResults {...this.getSearchResultsProps()} />;
    }

    renderServerError () {
        const errorMessages = {
            [errorCodes.INTERNAL_ERROR]: (<span>It seems GitHub API is not working right now. Try again later.</span>),
            [errorCodes.NOT_FOUND]: (<span>The user <strong>{this.state.searchTerm}</strong> doesn't exists.</span>)
        };

        return (
            <div className="alert alert-warning" role="alert">
                {errorMessages[this.props.serverErrorCode]}
            </div>
        );
    }
    
    getSearchBarProps () {
        return {
            isLoading: this.props.isLoading,
            onSearch: this.handleSearch.bind(this)
        };
    }

    getSearchResultsProps () {
        return {
            isLoading: this.props.isLoading,
            repositories: this.props.repositories,
            searchTerm: this.state.searchTerm
        };
    }

    handleSearch (searchTerm) {
        this.setState({searchTerm: searchTerm}, () => {
            this.props.makeRepositoriesRequest({urlParams: {user: searchTerm}});
        });
    }
}

const mapStateToProps = (state) => {
    return {
        serverErrorCode: state.searchPageFindRepositoriesByUser.getIn(['serverError', 'error', 'code'], null),
        isLoading: state.searchPageFindRepositoriesByUser.get('isLoading', false),
        repositories: state.searchPageFindRepositoriesByUser.getIn(['serverResponse', 'data'], List())
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        makeRepositoriesRequest: (payload) => dispatch(findRepositoriesByUserRequest(payload))
    };
};

const SearchPageConnected = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPage);

export default SearchPageConnected;