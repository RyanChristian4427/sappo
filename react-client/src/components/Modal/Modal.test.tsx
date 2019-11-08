import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './index';
import {Provider} from 'mobx-react';
import {AuthStore} from 'stores/modules/authStore';
import {MessageStore} from 'stores/modules/messageStore';
import {ModalType} from '../../models/Modal';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const authStore = new AuthStore();
    const messageStore = new MessageStore();
    const mockCloseModal = (): void => {};
    ReactDOM.render(
        <Provider authStore={authStore} messageStore={messageStore}>
            <Modal closeModal={mockCloseModal} type={ModalType.selectUsername}/>
            <Modal closeModal={mockCloseModal} type={ModalType.additionalDetails}/>
        </Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});
