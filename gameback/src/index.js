import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import "react-alice-carousel/lib/alice-carousel.css"
import store from './store';
import { Provider } from 'react-redux'
import { AlertProvider } from './contexts/alertContext';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider>
        <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


