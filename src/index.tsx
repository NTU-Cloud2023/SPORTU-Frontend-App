import { createRoot } from 'react-dom/client';
import React from 'react';
import './index.css';
import './shared.scss';
import reportWebVitals from './reportWebVitals';
import Router from './Router';
import GlobDataProvider from './Contexts/GlobDataProvider';

// require('dotenv').config();

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <GlobDataProvider>
            <Router />
        </GlobDataProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
