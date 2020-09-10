import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { WineApp, RegionsPage, WineListPage, WinePage, NotFound } from './components';
import './index.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { reducer } from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';

if (!window.Symbol) {
  window.Symbol = Symbol; // yeah, polyfill all the things !!!
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

class RoutedApp extends Component {
  render() {
    return (
      <Provider store = {store}>
        <Router>
          <WineApp />
          <Switch>
            <Route exact path="/" component={RegionsPage} />
            <Route exact path="/regions/:regionId" component={WineListPage} />
            <Route exact path="/regions/:regionId/wines/:wineId" component={WinePage} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<RoutedApp />, document.getElementById('root'));
