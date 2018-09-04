import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import AddForm from "./AdminPanel/AddForm"
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AddForm />, document.getElementById('root'));
registerServiceWorker();
