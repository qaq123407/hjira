import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DevTools, loadServer } from "jira-dev-tool";
import { AppProvides } from './screens/context';
import './wdyr';

// 初始化jira-dev-tool
loadServer(()=>

ReactDOM.render(
  <React.StrictMode>
    <AppProvides>
      <DevTools />
      <App />
    </AppProvides>
  </React.StrictMode>,
  document.getElementById('root')
)
);

// 在应用渲染后调用 reportWebVitals
reportWebVitals();
