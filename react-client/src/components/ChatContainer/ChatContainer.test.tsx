import React from 'react';
import ReactDOM from 'react-dom';
import ChatContainer from './index';
import {AuthStore} from 'stores/modules/authStore';
import {MessageStore} from 'stores/modules/messageStore';
import {Provider} from 'mobx-react';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const authStore = new AuthStore();
    const messageStore = new MessageStore();
    const mockHandleModal = (): void => {};
    const mockHandleSend = (): boolean => {return true;};
    ReactDOM.render(
        <Provider authStore={authStore} messageStore={messageStore}>
            <ChatContainer handleModal={mockHandleModal} handleSend={mockHandleSend}/>
        </Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});
