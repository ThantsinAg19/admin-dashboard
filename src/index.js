import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core';
import { I18nextProvider } from 'react-i18next';

/** Redux Persist for persistance of tabbars */
import { persistStore } from 'redux-persist';

/** Persistance combine in UI */
import { PersistGate } from 'redux-persist/integration/react';

import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';
import theme from './theme';
import i18n from './constant/Language'

import RootReducer from './module';
import { Provider } from 'react-redux';

/**
 * store
 */
const store = createStore(RootReducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

//** make store persistance */
const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <App />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </I18nextProvider>
  </BrowserRouter>
  </React.StrictMode>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
