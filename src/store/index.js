import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import rootReducer from './reducers'
import {composeWithDevTools} from 'redux-devtools-extension';

const loggerMiddleware = createLogger();

const isDev = process.env.NODE_ENV === "development";

const store = createStore(
    rootReducer,
    composeWithDevTools(isDev ?
        applyMiddleware(thunkMiddleware, loggerMiddleware) :
        applyMiddleware(thunkMiddleware)
    )
);

export default store;