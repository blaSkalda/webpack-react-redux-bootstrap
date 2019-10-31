
import React from 'react';
import Reactdom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { Router, HashRouter } from 'react-router-dom';

import routes from './routes';
import reducers from './services';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createBrowserHistory({ basename: baseUrl });

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

Reactdom.render(
  <Provider store={store}>
    <Router history={history}>
      <HashRouter>{routes}</HashRouter>
    </Router>
  </Provider>,
  document.getElementById('app'),
);
