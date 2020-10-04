import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducers from './../reducers'; // rootReducers
import rootSagas from './../sagas'; // rootSaga is a generator function

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const composeEnhance =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const configStore = () => {
  const middlewares = [thunk, sagaMiddleware]; // List middleware
  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(rootReducers, composeEnhance(...enhancers));
  sagaMiddleware.run(rootSagas); // A Subprogram start to tracking the actions
  return store;
};

export default configStore;
