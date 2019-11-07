import React from 'react';
import {inject} from 'mobx-react';

import {AdditionalDetails, BaseDetails, DataFields, ModalType} from 'src/models/Modal';
import {AuthStore} from 'src/stores/modules/authStore';
import {MessageStore} from 'src/stores/modules/messageStore';

import './Modal.scss';


interface IProps {
    closeModal: () => void;
    type: ModalType;
}

// Doing this is not recommended by any means, however, Typescript just fundamentally does not work with
// mobx's idea of injection. Doing this is the workaround, and better solution than suppressing typescripts warnings
// that a store type does not exist on the props.
interface InjectedProps {
    authStore: AuthStore;
    messageStore: MessageStore;
    closeModal: () => void;
    type: ModalType;
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

        const validationError = (this.state.validationError)
            ? <h2 className="error">The temperature and abundance fields both can only be numbers, or empty</h2>
            : null;

        const attachCoordinates = (!this.state.coordinatesAttached)
            ? <button className="button is-xanadu-light" onClick={this.currentLocation}>Attach Current Coordinates</button>
            : <button className="button is-deep-space-sparkle">Coordinates Successfully Attached!</button>;

        const previewImage = (this.state.details.file !== '')
            ? <div className="container preview-container">
                  <h2 className="has-text-centered">Preview:</h2>
                  <img src={this.state.details.file} alt="Upload preview"/>
              </div>
            : null;

        const content = (this.props.type === ModalType.selectUsername)
            ? <input className="input" type="text" placeholder="Your User Name" onChange={this.handleChange(DataFields.username)} />
            : <React.Fragment>
                <input className="input" type="text" placeholder="Abundance" onChange={this.handleChange(DataFields.abundance)} />
                <input className="input" type="text" placeholder="Species" onChange={this.handleChange(DataFields.species)} />
                <div className="has-text-centered">
                    {attachCoordinates}
                </div>
                <input className="input" type="text" placeholder="Temperature as Degrees in Celsius" onChange={this.handleChange(DataFields.temperature)} />
                <div className="file is-centered is-xanadu-light">
                    <label className="file-label">
                        <input className="file-input" type="file" name="resume" onChange={this.handleChange(DataFields.file)}/>
                        <span className="file-cta">
                            <span className="file-label">Choose a file…</span>
                        </span>
                    </label>
                </div>
                {previewImage}
                {validationError}
            </React.Fragment>;

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
    private handleChange = (field: DataFields) => (event: React.ChangeEvent<HTMLInputElement>): void => {
        const details = {...this.state.details};
        if (field === DataFields.abundance || field === DataFields.temperature) {
            const reg = new RegExp('^$|^[0-9]+$');
            if (!reg.test(event.target.value)) {
                this.setState({ validationError: true });
            } else {
                details[field] = Number(event.target.value);
                this.setState({details, validationError: false});
            }
        } else if (field === DataFields.species){
            details.species = event.target.value;
            this.setState({details});
        } else if (field === DataFields.file) {
            if (event.target.files != null) {
                details.file = URL.createObjectURL(event.target.files[0]);
                this.setState({ details });
            }
        } else if (field === DataFields.username) {
            this.setState({ username: event.target.value });
        }
    };

    private currentLocation = (): void  => {
        const setLocation = (latitude: number, longitude: number): void => {
            const details = {...this.state.details};
            details.coordinates = [latitude, longitude];
            this.setState({ details, coordinatesAttached: true });
        };

        navigator.geolocation.getCurrentPosition(function(position) {
            setLocation(position.coords.latitude, position.coords.longitude);
        });
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
