import React from 'react';
import './Chat.scss';
import ChatMessage from 'src/components/ChatMessage';
import {inject, observer} from 'mobx-react';
import {AuthStore} from '../../stores/modules/authStore';

interface InjectedProps {
    authStore: AuthStore;
}

interface IState {
    showModal: boolean;
    message: string;
    username: string;
}

enum Fields {
    
    username = 'username',
    message = 'message',
}

@inject('authStore')
@observer
export default class Chat extends React.Component<{}, IState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            showModal: false,
            message: '',
            username: '',
        }
    }

    public get injectedProps(): InjectedProps {
        return this.props as InjectedProps;
    }

    private createFillerData = (): React.ReactNode => {
        const list = [];

        for (let i=0; i<12; i++) {
            list.push(<ChatMessage abundance={5} coordinates="10, 20" datetimestamp={new Date()} message="Hello" species="Spotted Tree Frog" temperature={50} username="Ryan" />)
        }
        return list
    };

    public closeModal = (): void => {
        this.setState({ showModal: false });
    };

    render(): React.ReactNode {
        const usernameModal = (!this.state.showModal)
            ? null
            : <div className="modal is-active is-clipped">
                <div className="modal-background" onClick={this.closeModal} />
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Please Choose a User Name</p>
                    </header>
                    <section className="modal-card-body">
                        <input className="input" type="text" placeholder="Your User Name" onChange={this.handleChange(Fields.username)} />
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button" onClick={this.closeModal}>Cancel</button>
                        <button className="button is-success" onClick={this.setUsername}>Save changes</button>
                    </footer>
                </div>
            </div>;

        return (
            <div className="chat-page">
                <section className="hero is-xanadu-light is-bold is-small">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Sappo
                            </h1>
                        </div>
                    </div>
                </section>
                {usernameModal}
                <section className="chat-container is-xanadu-light">
                    <div className="messages">
                        {this.createFillerData()}
                    </div>
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input className="input" type="text" placeholder="Send Text Message" onChange={this.handleChange(Fields.message)} />
                        </div>
                        <div className="control">
                            <button className="button is-xanadu-light" onClick={this.handleSubmitForm}>
                                Search
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    private setUsername = (): void => {
        this.injectedProps.authStore.setUsername(this.state.username);
        this.closeModal();
    };

    private handleChange = (field: Fields) => (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (field == Fields.username || field == Fields.message) {
            // @ts-ignore
            // Have to ts ignore here, as it can't detect that I guarantee [field] is indeed a string type and is in `state`
            this.setState({ [field]: event.target.value });
        }
    };

    private handleSubmitForm = (e: React.FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        if (this.injectedProps.authStore.currentUser.Username === '') {
            console.log('No user name');
            this.setState({ showModal: true });
        } else {
            console.log(this.injectedProps.authStore.currentUser.Username);
        }
    }
}
