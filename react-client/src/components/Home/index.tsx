import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react-lite';

import {ChatContainer} from 'components/ChatContainer';

import HeroHeader from 'components/HeroHeader';
import {Modal} from 'components/Modal';
import {ModalType} from 'models/Modal';
import {AuthStoreContext, MessageStoreContext} from 'stores';


import './Home.scss';


export const Home: React.FC = observer(() => {
    const authStore = useContext(AuthStoreContext);
    const messageStore = useContext(MessageStoreContext);

    const [showUserModal, setShowUserModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);


    const openModal = (modalType: ModalType): void => {
        if (modalType === ModalType.selectUsername) {
            setShowUserModal(true);
        } else if (modalType === ModalType.additionalDetails) {
            setShowDetailsModal(true);
        }
    };

    const closeModal = (): void => {
        setShowUserModal(false);
        setShowDetailsModal(false);
    };

    // Returns true if the message has been sent
    const handleSubmit = (): boolean => {
        if (authStore.currentUser) {
            if (messageStore.message.text) {
                messageStore.sendMessage();
                return true;
            }
        }
        setShowUserModal(true);
        return false;
    };

    return (
        <div className="chat-page">
            <HeroHeader currentUser={authStore.currentUser} openModal={openModal} />
            {showUserModal &&
                <Modal closeModal={closeModal} type={ModalType.selectUsername} />
            }
            {showDetailsModal &&
                <Modal closeModal={closeModal} type={ModalType.additionalDetails} />
            }
            <ChatContainer openModal={openModal} handleSend={handleSubmit}/>
        </div>
    );
});
