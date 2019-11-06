import React from 'react';
import {AuthStore} from '../../stores/modules/authStore';
import {MessageStore} from 'src/stores/modules/messageStore';
import socket from 'src/models/Sockets';

import './Modal.scss';

interface IProps {
    closeModal: () => void;
    store: AuthStore | MessageStore;
}

interface IState {
    abundance: number;
    coordinates: [number, number];
    coordinatesAttached: boolean;
    species: string;
    temperature: number;
    username: string;
    validationError: boolean;
}

enum DataFields {
    abundance = 'abundance',
    species = 'species',
    temperature = 'temperature',
    username = 'username',
}

// Extremely reusable modal class, quite verbose, but cuts down on the amount of repeat components
export default class Modal extends React.Component<IProps, IState> {
    constructor(props: IProps){
        super(props);
        this.state = {
            abundance: 0,
            coordinates: [0, 0],
            coordinatesAttached: false,
            species: '',
            temperature: 0,
            username: '',
            validationError: false,
        };
    };

    render(): React.ReactNode {
        // Perhaps I could do a more verbose prop system, where this is all injected from the parent component, but
        // I figured this was the cleaner look and I know it doesn't need to be scaled to such great heights.

        // Uses the injected store type to decide what type of modal should be displayed
        const title = (this.props.store instanceof AuthStore)
            ? 'Please Choose a User Name'
            : 'Please Enter Any Other Details You May Have';

        const validationError = (this.state.validationError)
            ? <h2 style={{color: 'red'}}>The temperature and abundance fields both can only be numbers, or empty</h2>
            : null;

        const attachCoordinates = (!this.state.coordinatesAttached)
            ? <button className="button is-xanadu-light" onClick={this.currentLocation}>Attach Current Coordinates</button>
            : <button className="button is-deep-space-sparkle">Coordinates Successfully Attached!</button>;

        const content = (this.props.store instanceof AuthStore)
            ? <input className="input" type="text" placeholder="Your User Name" onChange={this.handleChange(DataFields.username)} />
            : <React.Fragment>
                <input className="input" type="text" placeholder="Abundance" onChange={this.handleChange(DataFields.abundance)} />
                <input className="input" type="text" placeholder="Species" onChange={this.handleChange(DataFields.species)} />
                <div className="has-text-centered">
                    {attachCoordinates}
                </div>
                <input className="input" type="text" placeholder="Temperature as Degrees in Celsius" onChange={this.handleChange(DataFields.temperature)} />
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
        if (field === DataFields.abundance || field === DataFields.species ||
            field === DataFields.temperature || field === DataFields.username) {
            if (field === DataFields.abundance || field === DataFields.temperature) {
                const reg = new RegExp('^$|^[0-9]+$');
                if (!reg.test(event.target.value)) {
                    this.setState({ validationError: true });
                } else {
                    // @ts-ignore
                    // Have to ignore, as even with proper type checking, TS compiler isn't sure that a field from outside the state won't be used
                    this.setState({[field]: event.target.value, validationError: false});
                }
            } else {
                // @ts-ignore
                // Have to ignore, as even with proper type checking, TS compiler isn't sure that a field from outside the state won't be used
                this.setState({[field]: event.target.value});
            }
        }
    };

    private currentLocation = (): void  => {
        const setLocation = (latitude: number, longitude: number): void => {
            this.setState({ coordinates: [latitude, longitude], coordinatesAttached: true });
        };

        navigator.geolocation.getCurrentPosition(function(position) {
            setLocation(position.coords.latitude, position.coords.longitude);
        });
    };


    private handleSave = (): void => {
        if (this.props.store instanceof AuthStore) {
            this.props.store.setUsername(this.state.username);
            this.props.closeModal();
            socket.emit('change_username', {username: this.state.username});
        } else {
            this.props.store.setAdditionalDetails({
                abundance: this.state.abundance,
                coordinates: this.state.coordinates,
                species: this.state.species,
                temperature: this.state.temperature,
            });
            this.props.closeModal();
        }
    };
}
