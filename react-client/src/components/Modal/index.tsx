import React from 'react';
import {inject} from 'mobx-react';

import {AdditionalDetails, BaseDetails, DataFields, ModalType} from 'models/Modal';
import {AuthStore} from 'stores/modules/authStore';
import {MessageStore} from 'stores/modules/messageStore';

import './Modal.scss';
import DetailsModal from './DetailsModal';


interface IProps {
    closeModal: () => void;
    type: ModalType;
}

// Doing this is not recommended by any means, however, Typescript just fundamentally does not work with
// mobx's idea of injection. Doing this is the workaround, and better solution than suppressing typescripts warnings
// that a store type does not exist on the props.
interface InjectedProps extends IProps {
    authStore: AuthStore;
    messageStore: MessageStore;
}

interface IState {
    coordinatesAttached: boolean;
    details: AdditionalDetails;
    username: string;
    validationError: boolean;
}

@inject('authStore', 'messageStore')
export default class Modal extends React.Component<IProps, IState> {
    constructor(props: IProps){
        super(props);
        this.state = {
            coordinatesAttached: false,
            details: BaseDetails,
            username: '',
            validationError: false,
        };
    };

    public get injectedProps(): InjectedProps {
        return this.props as InjectedProps;
    }

    render(): React.ReactNode {
        // This is quite a busy component, though the logic is quite simple overall. There's just a lot of variables
        // at play as I reuse the base modal. If this was any bigger, I'd separate the two modal into separate components
        // entirely.

        // Uses the injected store type to decide what type of modal should be displayed
        const title = (this.props.type === ModalType.selectUsername)
            ? 'Please Choose a User Name'
            : 'Please Enter Any Other Details You May Have';

        const content = (this.props.type === ModalType.selectUsername)
            ? <input className="input" type="text" placeholder="Your User Name" onChange={this.handleChange} />
            : <DetailsModal handleDetailsChange={this.handleDetailsChange} />;

        return (
            <div className="modal is-active is-clipped">
                <div className="modal-background" onClick={this.props.closeModal} />
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{title}</p>
                    </header>
                    <section className="modal-card-body">
                        { content }
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button" onClick={this.props.closeModal}>Cancel</button>
                        <button className="button is-success" onClick={this.handleSave}>Save changes</button>
                    </footer>
                </div>
            </div>
        );
    }

    // Uses dataFields as an enum to decide which input actually needs to be updated. Got this idea from a project I did in Rust,
    // where you're forced to use enums if you want options like this.
    private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ username: event.target.value });
    };

    private handleDetailsChange = (field: DataFields, value: string | number | [number, number]): void  => {
        const details = {...this.state.details};
        // @ts-ignore
        //Have to suppress as there's no easy or clean way to let TS know we're sure of the types
        details[field] = value;
        this.setState({ details });
    };

    private handleSave = (): void => {
        if (this.props.type === ModalType.selectUsername) {
            this.injectedProps.authStore.setUsername(this.state.username);
            this.props.closeModal();
        } else {
            this.injectedProps.messageStore.setAdditionalDetails(this.state.details);
            this.props.closeModal();
        }
    };
}
