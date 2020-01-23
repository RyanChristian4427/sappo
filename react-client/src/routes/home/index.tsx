import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { ChatContainer } from 'components/ChatContainer';

import HeroHeader from 'components/HeroHeader';
import { Modal } from 'components/Modal';
import { ModalType } from 'models/Modal';
import { AuthStoreContext, MessageStoreContext } from 'stores';

import 'routes/home/Home.scss';

export const Home: React.FC = observer(() => {
    const authStore = useContext(AuthStoreContext);
    const messageStore = useContext(MessageStoreContext);

    const [showUserModal, setShowUserModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [submissionError, setSubmissionError] = useState('');

    const openModal = (modalType: ModalType): void => {
        if (modalType === ModalType.selectUsername) {
            setShowUserModal(true);
        } else if (modalType === ModalType.additionalDetails) {
            setShowDetailsModal(true);
        }
    };

    const closeModals = (): void => {
        setShowUserModal(false);
        setShowDetailsModal(false);
    };

    // Returns true if the message has been sent
    const handleSend = (): boolean => {
        if (authStore.currentUser) {
            if (messageStore.message.text) {
                messageStore.sendMessage();
                setSubmissionError('');
                return true;
            } else setSubmissionError('Message Must Have Text');
        } else setShowUserModal(true);
        return false;
    };

    return (
        <div className="chat-page">
            <HeroHeader currentUser={authStore.currentUser} openModal={openModal} />
            {showUserModal ? (
                <Modal closeModal={closeModals} type={ModalType.selectUsername} />
            ) : showDetailsModal ? (
                <Modal closeModal={closeModals} type={ModalType.additionalDetails} />
            ) : null}
            <ChatContainer openModal={openModal} handleSend={handleSend} submissionError={submissionError} />
        </div>
    );
});
