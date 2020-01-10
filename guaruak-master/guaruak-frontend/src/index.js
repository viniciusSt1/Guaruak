import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

import * as serviceWorker from './serviceWorker';

import Router from './main/router';
import Reducers from './main/reducers';

const store = compose(applyMiddleware(promise, thunk))(createStore)(Reducers);

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
document.getElementById('root'));

serviceWorker.unregister();
