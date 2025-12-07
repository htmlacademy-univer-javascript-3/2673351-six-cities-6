import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app';
import {offers} from './mocks/offers';
import {Provider} from 'react-redux';
import {store} from './store';
import { loadOffers } from './store/action';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const placeCount = 5;
store.dispatch(loadOffers(offers));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App placeCount={placeCount} offers={offers}/>
    </Provider>
  </React.StrictMode>
);
