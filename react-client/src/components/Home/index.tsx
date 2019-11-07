import React from 'react';
import {inject, observer} from 'mobx-react';

import ChatContainer from 'src/components/ChatContainer';
import Modal from 'src/components/Modal';
import HeroHeader from 'src/components/HeroHeader';
import {ModalType} from 'src/models/Modal';
import {AuthStore} from 'src/stores/modules/authStore';
import {MessageStore} from 'src/stores/modules/messageStore';

import './Home.scss';

// Doing this is not recommended by any means, however, Typescript just fundamentally does not work with
// mobx's idea of injection. Doing this is the workaround, and better solution than suppressing typescripts warnings
// that a store type does not exist on the props.
interface InjectedProps {
    authStore: AuthStore;
    messageStore: MessageStore;
}

interface IState {
    showUserModal: boolean;
    showDetailsModal: boolean;
}

@inject('authStore', 'messageStore')
@observer
export default class Chat extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showUserModal: false,
            showDetailsModal: false,
        };
    }

    private get injectedProps(): InjectedProps {
        return this.props as InjectedProps;
    }

    public render(): React.ReactNode {
        const { currentUser } = this.injectedProps.authStore;

        const modal = (this.state.showUserModal)
            ? <Modal closeModal={this.closeModal} type={ModalType.selectUsername} />
            : (this.state.showDetailsModal)
                ? <Modal closeModal={this.closeModal} type={ModalType.additionalDetails} />
                : null;

        return (
            <div className="chat-page">
                <HeroHeader currentUser={currentUser} handleModal={this.handleModal} />
                {modal}
                <ChatContainer handleModal={this.handleModal} handleSend={this.handleSend}/>
            </div>
        );
    }

    private handleModal = (type: ModalType): void => {
        if (type == ModalType.selectUsername) {
            this.setState({ showUserModal: true });
        } else if (type == ModalType.additionalDetails) {
            this.setState({ showDetailsModal: true });
        }
    };

    public closeModal = (): void => {
        this.setState({ showUserModal: false, showDetailsModal: false });
    };

    // Returns true if the message has been sent
    private handleSend = (): boolean => {
        if (this.injectedProps.authStore.currentUser == '') {
            this.setState({ showUserModal: true });
        } else if (this.injectedProps.messageStore.message.text != '') {
            this.injectedProps.messageStore.sendMessage();
            return true;
        }
        return false;
    };
}
