import React from 'react';
import {inject, observer} from 'mobx-react';

import MessageCard from 'src/components/MessageCard';
import Modal from 'src/components/Modal';
import HeroHeader from 'src/components/HeroHeader';
import {ReturnedChatMessage} from 'src/models/ChatMessage';
import {ModalType} from 'src/models/Modal';
import socket from 'src/models/Sockets';
import {AuthStore} from 'src/stores/modules/authStore';
import {MessageStore} from 'src/stores/modules/messageStore';

import './Home.scss';

// Doing this is not recommended by any means, however, Typescript just fundamentally does not work with
// mobx's idea of injection. With the introduction of hooks, mobx no longer suggests injection at all.
// However, I decided to do this to keep the class based system. This turned out to be a poor decision.
interface InjectedProps {
    authStore: AuthStore;
    messageStore: MessageStore;
}

interface IState {
    showUserModal: boolean;
    showDetailsModal: boolean;
    showJoinMessage: boolean;
    text: string;
    messages: Array<ReturnedChatMessage>;
    newestUser: string;
}

@inject('authStore', 'messageStore')
@observer
export default class Chat extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showUserModal: false,
            showDetailsModal: false,
            showJoinMessage: false,
            text: '',
            messages: [],
            newestUser: '',
        };
        socket.on('new_user_join', (newUser: string) => {
            if (newUser !== this.injectedProps.authStore.currentUser) {
                this.setState({
                    newestUser: newUser,
                    showJoinMessage: true
                });

                setTimeout(() => {
                    this.setState({
                        showJoinMessage: false
                    });
                }, 20000);
            }
        });

        // Appends any new messages to the end of a message array
        socket.on('new_message', (message: ReturnedChatMessage) => {
            this.setState({messages: [...this.state.messages, message ]});
        });
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

        const messages = (this.state.messages.map((message) => {
            return (
                <MessageCard key={message.username + message.text} message={message} currentUser={currentUser} />
            );
        }));

        const joinMessage = (this.state.showJoinMessage)
            ? <h2 className="join-message">{this.state.newestUser} has joined the chat</h2>
            : null;

        return (
            <div className="chat-page">
                <HeroHeader currentUser={currentUser} handleUserModal={this.handleUserModal} />
                {modal}
                <section className="chat-container is-xanadu-light">
                    <div className="messages">
                       {messages}
                    </div>
                    <div>
                        {joinMessage}
                    </div>
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input className="input" type="text" placeholder="Send Text Message" onChange={this.handleChange} value={this.state.text} />
                        </div>
                        <div className="control">
                            <button className="button is-xanadu-light" id="details-button" onClick={this.handleDetailsModal}>Add Details</button>
                        </div>
                        <div className="control">
                            <button className="button is-xanadu-light" onClick={this.handleSend}>Send</button>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ text: event.target.value });
    };

    private handleUserModal = (): void => {
        this.setState({ showUserModal: true });
    };

    private handleDetailsModal = (): void => {
        this.setState({ showDetailsModal: true });
    };

    public closeModal = (): void => {
        this.setState({ showUserModal: false, showDetailsModal: false });
    };

    private handleSend = (): void => {
        if (this.injectedProps.authStore.currentUser === '') {
            this.setState({ showUserModal: true });
        } else if (this.state.text !== '') {
            this.injectedProps.messageStore.sendMessage(this.state.text);
            this.setState({ text: '' });
        }
    };
}
