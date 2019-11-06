import React from 'react';
import {inject, observer} from 'mobx-react';

import logo from 'src/assets/logo.png';
import MessageCard from 'src/components/MessageCard';
import Modal from 'src/components/Modal';
import {ChatMessage} from 'src/models/ChatMessage';
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
    showDataModal: boolean;
    text: string;
    messages: Array<ChatMessage>;
}

@inject('authStore', 'messageStore')
@observer
export default class Chat extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showUserModal: false,
            showDataModal: false,
            text: '',
            messages: [],
        };
        socket.on('new_user_join', (newUser: string) => {
            console.log(newUser + ' has joined the chat');
        });

        // Appends any new messages to the end of a message array
        socket.on('new_message', (message: ChatMessage) => {
            this.setState({messages: [...this.state.messages, message ]});
        });
    }

    public get injectedProps(): InjectedProps {
        return this.props as InjectedProps;
    }

    render(): React.ReactNode {
        const { currentUser } = this.injectedProps.authStore;

        const currentlyLoggedInAs = (currentUser.Username !== '')
            ? <h2 className="subtitle">Currently logged in as: {currentUser.Username}</h2>
            : null;

        const modal = (this.state.showUserModal)
            ? <Modal closeModal={this.closeModal} type={ModalType.selectUsername} />
            : (this.state.showDataModal)
                ? <Modal closeModal={this.closeModal} type={ModalType.additionalDetails} />
                : null;

        const messages = (this.state.messages.map((message) => {
            return (
                <MessageCard key={message.username + message.message} abundance={message.abundance} coordinates={message.coordinates}
                             datetimestamp={new Date()} message={message.message}
                             species={message.species} temperature={message.temperature}
                             username={message.username} currentUser={this.injectedProps.authStore.currentUser.Username} />
            );
        }));

        return (
            <div className="chat-page">
                <section className="hero is-xanadu-light is-bold is-small">
                    <div className="hero-body">
                        <div className="navbar">
                            <div className="container">
                                <div className="navbar-brand">
                                    <img className="navbar-item" src={logo} alt="Sappo logo"/>
                                </div>
                                <div className="navbar-content">
                                    <h1 className="title">
                                        Sappo
                                    </h1>
                                    {currentlyLoggedInAs}
                                </div>
                                <div className="navbar-end">
                                    <button className="button is-charleston-green-dark" onClick={this.handleSetName}>Pick User Name</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {modal}
                <section className="chat-container is-xanadu-light">
                    <div className="messages">
                       {messages}
                    </div>
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input className="input" type="text" placeholder="Send Text Message" onChange={this.handleChange} value={this.state.text} />
                        </div>
                        <div className="control">
                            <button className="button is-xanadu-light" id="details-button" onClick={this.handleDetailsMenu}>Add Details</button>
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

    private handleSetName = (): void => {
        this.setState({ showUserModal: true });
    };

    private handleSend = (): void => {
        if (this.injectedProps.authStore.currentUser.Username === '') {
            this.setState({ showUserModal: true });
        } else if (this.state.text !== '') {
            this.injectedProps.messageStore.sendMessage(this.state.text);
            this.setState({ text: '' });
        }
    };

    private handleDetailsMenu = (): void => {
        this.setState({ showDataModal: true });
    };

    public closeModal = (): void => {
        this.setState({ showUserModal: false, showDataModal: false });
    };
}
