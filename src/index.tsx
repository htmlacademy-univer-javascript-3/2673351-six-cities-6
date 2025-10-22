import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app';
import {offers} from './mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const placeCount = 5;

root.render(
  <React.StrictMode>
    <App placeCount={placeCount} offers={offers}/>
  </React.StrictMode>
);
