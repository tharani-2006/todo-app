import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App.jsx';
const cors = require('cors');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

app.use(cors({
  origin: 'https://todo-app-six-sigma-95.vercel.app', 
}));

