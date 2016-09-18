import _ from 'lodash';
import Axios from 'axios';
import { baseUrl, errorCodes, matchParameterRegex } from '../../config/services';


export const CALL_SERVICE = Symbol('Call to external service');

export default store => next => action => {
    const callService = action[CALL_SERVICE];
    const payload = action.payload;

    if (typeof callService === 'undefined') {
        next(action);
    }

    let { service, actions } = callService;
    let { failureAction, loadingAction, successAction } = actions;

    next(loadingAction(payload));

    return makeServiceRequest(service, payload)
        .then(response => next(successAction({data: response})))
        .catch(error => {
            if (_.get(error, 'response.status') === 404) {
                next(failureAction({code: errorCodes.NOT_FOUND}))
            } else {
                next(failureAction({code: errorCodes.INTERNAL_ERROR}));
            }
        });
};

const makeServiceRequest = (service, payload) => {
    return new Promise((resolve, reject) => {
        if (service) {
            const method = service.method.toLowerCase();
            const url = (!_.isEmpty(payload.urlParams)) ? replaceUrlParams(service.url, payload.urlParams) : service.url;
            
            let axios = Axios.create({
                baseURL: baseUrl,
                method: method,
                url: url,
                timeout: 5000
            });
            let extraConfig = {};

            if (method === 'get') {
                extraConfig = {
                    params: _.omit(payload, 'urlParams') || {}
                }
            } else if (['post', 'put', 'update'].indexOf(method) !== - 1) {
                extraConfig = {
                    data: _.omit(payload, 'urlParams') || {}
                }
            }

            return axios.request(extraConfig)
                .then(results => resolve(results.data))
                .catch(error => reject(error))
        }

        return reject(new Error('Service is empty'))
    });
};

const replaceUrlParams = (url = '', params = {}) => {
    var found;
    var result = url;

    while (found = matchParameterRegex.exec(url)) {
        var variableName = found[0].substring(1, found[0].length - 1);

        result = result.replace(found[0], params[variableName])
    }

    return result;
};