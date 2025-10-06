import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvides } from './screens/context';

ReactDOM.render(
  <React.StrictMode>
    <AppProvides>
        <App />
    </AppProvides>
   
  </React.StrictMode>,
  document.getElementById('root')
);

// 如果您使用 web-vitals
reportWebVitals();