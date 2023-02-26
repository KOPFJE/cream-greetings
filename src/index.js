import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
const clientID = "763523850373-1tddmg1gmu1mc6imepsrqmui72pga934.apps.googleusercontent.com";
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientID}>
      <App clientID={clientID} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);