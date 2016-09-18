import { fromJS } from 'immutable';
import { expect } from 'chai';

import { CALL_SERVICE } from '../../../app/src/redux/middleware/CallService';
import services from '../../../app/src/config/services';
import {
    SEARCH_PAGE_FIND_REPOSITORIESS_BY_USER_FAILURE,
    SEARCH_PAGE_FIND_RESPOSITORIES_BY_USER_LOADING,
    SEARCH_PAGE_FIND_RESPOSITORIES_BY_USER_SUCCESS,
    findRepositoresByUserLoading,
    findRepositoresByUserFailure,
    findRepositoriesByUserRequest,
    findRepositoresByUserSuccess
} from '../../../app/src/redux/actions/searchPageActions';



describe('searchPageActions', () => {

    it('should dispatch the error action properly' , () => {
        const expectedAction = {
            type: SEARCH_PAGE_FIND_REPOSITORIESS_BY_USER_FAILURE,
            error: 'error'
        };

        expect(findRepositoresByUserFailure('error')).to.deep.equal(expectedAction);
    });

    it('should dispatch the loading action properly' , () => {
        const expectedAction = {
            type: SEARCH_PAGE_FIND_RESPOSITORIES_BY_USER_LOADING,
            payload: {mock: true}
        };

        expect(findRepositoresByUserLoading({mock: true})).to.deep.equal(expectedAction);
    });

    it('should dispatch the request action properly' , () => {
        const expectedAction = {
            [CALL_SERVICE]: {
                actions: {
                    failureAction: findRepositoresByUserFailure,
                    loadingAction: findRepositoresByUserLoading,
                    successAction: findRepositoresByUserSuccess
                },
                service: services.findByUser
            },
            payload: {mock: true}
        };

        expect(findRepositoriesByUserRequest({mock: true})).to.deep.equal(expectedAction);
    });

    it('should dispatch the success action properly' , () => {
        const expectedAction = {
            type: SEARCH_PAGE_FIND_RESPOSITORIES_BY_USER_SUCCESS,
            response: {mock: true}
        };

        expect(findRepositoresByUserSuccess({mock: true})).to.deep.equal(expectedAction);
    });
});