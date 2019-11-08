import React from 'react';
import ReactDOM from 'react-dom';
import PageNotFound from './PageNotFound';
import {BrowserRouter} from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <PageNotFound/>
        </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});
