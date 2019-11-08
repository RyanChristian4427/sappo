import React from 'react';
import ReactDOM from 'react-dom';
import Home from './index';
import {Provider} from 'mobx-react';
import {AuthStore} from 'stores/modules/authStore';
import {MessageStore} from 'stores/modules/messageStore';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const authStore = new AuthStore();
    const messageStore = new MessageStore();
    ReactDOM.render(
        <Provider authStore={authStore} messageStore={messageStore}>
            <Home />
        </Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});
