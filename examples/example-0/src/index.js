import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import postReducr from './models/Post/redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = createStore(
  combineReducers({
    Post: postReducr,
  }),
  {},
);

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
