import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from '../reducers/index';

const middlewares = [];
const { logger } = require('redux-logger');

const  sagaMiddleware = createSagaMiddleware();
//添加saga中间件
middlewares.push(sagaMiddleware);
if(__DEV__){
    //添加logger中间件
    middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);
    //install saga run
    store.runSaga = sagaMiddleware.run;
    store.close  = () =>store.dispatch(END);
    return store;
}