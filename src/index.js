import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
//import reportWebVitals from './reportWebVitals';

window.var = {
  userPage:1,
  userName:""
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

//reportWebVitals();
