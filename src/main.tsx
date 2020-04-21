import { App } from './app';
import React from 'react';
import ReactDOM from 'react-dom';
import { StoreContext } from 'app/context/store';
import store from 'app/stores/index';
import '@vkontakte/vkui/dist/vkui.css';

import { Router } from 'react-router-dom';
import history from 'app/core/components/history/history';

const Store: any = store;

ReactDOM.render(
  <StoreContext.Provider value={Store}>
    <Router history={history}>
      <App />
    </Router>,
  </StoreContext.Provider>,
  document.getElementById('root')
);
