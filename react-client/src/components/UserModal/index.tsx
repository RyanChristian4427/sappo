import React from 'react';
import {AuthStore} from '../../stores/modules/authStore';
import socket from 'src/models/Sockets';

interface IProps {
    authStore: AuthStore;
    show: boolean;
    closeModal: () => void;
}

interface IState {
    username: string;
}

export default class UsernameModal extends React.Component<IProps, IState> {

    constructor(props: IProps){
        super(props);
        this.state = {
            username: '',
        };
    };

    render(): React.ReactNode {
        if (!this.props.show) {
            return null;
        } else {
            return (
                <div className="modal is-active is-clipped">
                    <div className="modal-background" onClick={this.props.closeModal} />
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Please Choose a User Name</p>
                        </header>
                        <section className="modal-card-body">
                            <input className="input" type="text" placeholder="Your User Name" onChange={this.handleChange} />
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button" onClick={this.props.closeModal}>Cancel</button>
                            <button className="button is-success" onClick={this.setUsername}>Save changes</button>
                        </footer>
                    </div>
                </div>
            )
        }
    }

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ username: event.target.value });
    };

    private setUsername = (): void => {
        this.props.authStore.setUsername(this.state.username);
        this.props.closeModal();
        socket.emit('change_username', {username: this.state.username});
    };
}
