import { CALL_SERVICE } from '../middleware/CallService';
import services from '../../config/services';

/*
    Action types
 */
export const SEARCH_PAGE_FIND_REPOSITORIESS_BY_USER_FAILURE = 'SEARCH_PAGE_FIND_RESPOSITORIES_BY_USER_FAILURE';
export const SEARCH_PAGE_FIND_RESPOSITORIES_BY_USER_LOADING = 'SEARCH_PAGE_FIND_RESPOSITORIES_BY_USER_LOADING';
export const SEARCH_PAGE_FIND_RESPOSITORIES_BY_USER_SUCCESS = 'SEARCH_PAGE_FIND_RESPOSITORIES_BY_USER_SUCCESS';

/*
    Async action creators
 */

export const findRepositoriesByUserRequest = (payload) => {
    return {
        [CALL_SERVICE]: {
            actions: {
                failureAction: findRepositoresByUserFailure,
                loadingAction: findRepositoresByUserLoading,
                successAction: findRepositoresByUserSuccess
            },
            service: services.findByUser
        },
        payload: payload
    };
};

/*
    Sync action creators
 */
export const findRepositoresByUserFailure = (error) => {
    return {
        type: SEARCH_PAGE_FIND_REPOSITORIESS_BY_USER_FAILURE,
        error: error
    };
};
export const findRepositoresByUserLoading = (payload) => {
    return {
        type: SEARCH_PAGE_FIND_RESPOSITORIES_BY_USER_LOADING,
        payload: payload
    };
};
export const findRepositoresByUserSuccess = (response) => {
    return {
        type: SEARCH_PAGE_FIND_RESPOSITORIES_BY_USER_SUCCESS,
        response: response
    };
};
