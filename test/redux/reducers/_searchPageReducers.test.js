import { fromJS } from 'immutable';
import { expect } from 'chai';

import {
    SEARCH_PAGE_FIND_REPOSITORIESS_BY_USER_FAILURE,
    SEARCH_PAGE_FIND_RESPOSITORIES_BY_USER_LOADING,
    SEARCH_PAGE_FIND_RESPOSITORIES_BY_USER_SUCCESS
} from '../../../app/src/redux/actions/searchPageActions';
import reducer from '../../../app/src/redux/reducers/searchPageReducers';

describe('searchPageReducers', () => {

    const reducerFunction = reducer.searchPageFindRepositoriesByUser;

    it('should return the correct initial state when is called for the first time' , () => {
        const initialState = fromJS({
            isLoading: false,
            payload: {},
            serverResponse: {},
            serverError: {}
        });

        expect(reducerFunction()).to.equal(initialState);
    });

    it('should handle the loading action properly' , () => {
        const action = {
            payload: {mock: true},
            type: SEARCH_PAGE_FIND_RESPOSITORIES_BY_USER_LOADING
        };
        const initialState = fromJS({
            isLoading: false,
            payload: {},
            serverResponse: {},
            serverError: {}
        });
        const expectedState = fromJS({
            isLoading: true,
            payload: {mock: true},
            serverResponse: {},
            serverError: {}
        });

        expect(reducerFunction(initialState, action)).to.equal(expectedState);
    });

    it('should handle the success action properly' , () => {
        const action = {
            response: {data: {mock: true}},
            type: SEARCH_PAGE_FIND_RESPOSITORIES_BY_USER_SUCCESS
        };
        const initialState = fromJS({
            isLoading: false,
            payload: {},
            serverResponse: {},
            serverError: {}
        });
        const expectedState = fromJS({
            isLoading: false,
            payload: {},
            serverResponse: {data: {mock: true}},
            serverError: {}
        });

        expect(reducerFunction(initialState, action)).to.equal(expectedState);
    });

    it('should handle the failure action properly' , () => {
        const action = {
            error: {code: 'error'},
            type: SEARCH_PAGE_FIND_REPOSITORIESS_BY_USER_FAILURE
        };
        const initialState = fromJS({
            isLoading: false,
            payload: {},
            serverResponse: {},
            serverError: {}
        });
        const expectedState = fromJS({
            isLoading: false,
            payload: {},
            serverResponse: {},
            serverError: {error: {code: 'error'}}
        });

        expect(reducerFunction(initialState, action)).to.equal(expectedState);
    });
});