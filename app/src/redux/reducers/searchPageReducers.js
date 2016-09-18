//Vendor
import { fromJS } from 'immutable'

import {
    SEARCH_PAGE_FIND_REPOSITORIESS_BY_USER_FAILURE,
    SEARCH_PAGE_FIND_RESPOSITORIES_BY_USER_LOADING,
    SEARCH_PAGE_FIND_RESPOSITORIES_BY_USER_SUCCESS
} from '../actions/searchPageActions';

const initialState = fromJS({
    isLoading: false,
    payload: {},
    serverResponse: {},
    serverError: {}
});

const searchPageFindRepositoriesByUser = (state = initialState, action = {}) => {
    switch (action.type) {
        case SEARCH_PAGE_FIND_REPOSITORIESS_BY_USER_FAILURE:
            return state.merge({
                isLoading: false,
                payload: action.payload,
                serverError: {
                    error: fromJS(action.error)
                },
                serverResponse: {}
            });
            break;
        case SEARCH_PAGE_FIND_RESPOSITORIES_BY_USER_LOADING:
            return state.merge({
                isLoading: true,
                payload: action.payload,
                serverError: {},
                serverResponse: {}
            });
            break;
        case SEARCH_PAGE_FIND_RESPOSITORIES_BY_USER_SUCCESS:
            return state.merge({
                isLoading: false,
                payload: action.payload,
                serverError: {},
                serverResponse: {
                    data: fromJS(action.response.data)
                }
            });
            break;
        default:
            return state;
            break;
    }
};

export default {
    searchPageFindRepositoriesByUser: searchPageFindRepositoriesByUser
}