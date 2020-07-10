import './index.css';
import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import Index from './App'
import * as allReducers from './reducers/redContainer';

const rootReducer = combineReducers(allReducers)

let store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


document.getElementById('root').style.height = "100%";
ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
