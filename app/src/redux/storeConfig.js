//Redux
import applyMiddleware from 'redux/lib/applyMiddleware';
import combineReducers from 'redux/lib/combineReducers';
import creteStore from 'redux/lib/createStore';

//Reducers
import searchPageReducers from '../redux/reducers/searchPageReducers';

//CallService middleware
import reduxCallServiceMiddleware from './middleware/CallService';

//Logger middleware
import createLogger from 'redux-logger';

const reduxLoggerMiddleware = createLogger({
    collapsed: true,
    stateTransformer: state => {
        var loggedState = {
            __transformedKeys: []
        };

        Object.keys(state).map(key => {
            const stateNode = state[key];

            if (typeof stateNode.toJS === 'function') {
                loggedState.__transformedKeys.push(key);
                loggedState[key] = stateNode.toJS();
            } else {
                loggedState[key] = stateNode;
            }
        });

        return loggedState;
    }
});

const getCombinedReducers = () =>
    combineReducers(Object.assign(
        {},
        searchPageReducers
    ));

export const createStoreForClient = (initialState = {}) => {
    const reducer = getCombinedReducers();
    const middlewares = [
        reduxCallServiceMiddleware,
        reduxLoggerMiddleware
    ];

    const createStoreFromMiddleware = applyMiddleware.apply(null, middlewares)(creteStore);
    const store = createStoreFromMiddleware(reducer, initialState);

    return store;
};