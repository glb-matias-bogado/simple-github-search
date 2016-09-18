//Vendor
import React, { Component } from 'react';
import { render } from 'react-dom';
import Provider from 'react-redux/lib/components/Provider'

//Redux
import { createStoreForClient } from './redux/storeConfig';

//Root components
import App from './components-root/App/App';

const store = createStoreForClient();
const application = (
    <Provider store={store}>
        <App />
    </Provider>
);

render(application, document.getElementById('app-root'));