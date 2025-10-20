import React from 'react';
import { loadDevTools } from "jira-dev-tool";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvides } from './screens/context';

// 使用 jira-dev-tool 的 loadDevTools 函数初始化开发工具
loadDevTools(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AppProvides>
        <App />
      </AppProvides>
    </React.StrictMode>,
    document.getElementById('root')
  );

  // 在应用渲染后调用 reportWebVitals
  reportWebVitals();
});
