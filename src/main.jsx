import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { RoleProvider } from './contexts/RoleContext';
import App from './App';
import './index.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
    <RoleProvider>
    <App /> 
    </RoleProvider>
  </React.StrictMode>
);

 
 
 
 
 
 
 