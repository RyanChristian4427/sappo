import React from 'react';

import {DataFields} from 'models/Modal';

import './Modal.scss';


interface IProps {
    handleDetailsChange: (field: DataFields, value: string | number | [number, number]) => void;
}

interface IState {
    coordinatesAttached: boolean;
    file: string;
    validationError: boolean;
}

export default class DetailsModal extends React.Component<IProps, IState> {
    constructor(props: IProps){
        super(props);
        this.state = {
            coordinatesAttached: false,
            file: '',
            validationError: false,
        };
    };

    render(): React.ReactNode {
        const validationError = (this.state.validationError)
            ? <h2 className="error">The temperature and abundance fields both can only be numbers, or empty</h2>
            : null;

        const attachCoordinates = (this.state.coordinatesAttached)
            ? <button className="button is-deep-space-sparkle">Coordinates Successfully Attached!</button>
            : <button className="button is-xanadu-light" onClick={this.currentLocation}>Attach Current Coordinates</button>;

        const previewImage = (this.state.file !== '')
            ? <div className="container preview-container">
                <h2 className="has-text-centered">Preview:</h2>
                <img src={this.state.file} alt="Upload preview"/>
              </div>
            : null;

        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }

    // Uses dataFields as an enum to decide which input actually needs to be updated. Got this idea from a project I did in Rust,
    // where you're forced to use enums if you want options like this.
    private handleChange = (field: DataFields) => (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (field === DataFields.abundance || field === DataFields.temperature) {
            const reg = new RegExp('^$|^[0-9]+$');
            if (!reg.test(event.target.value)) {
                this.setState({ validationError: true });
            } else {
                this.props.handleDetailsChange(field, Number(event.target.value));
            }
        } else if (field === DataFields.species){
            this.props.handleDetailsChange(field, event.target.value);
        } else if (field === DataFields.file) {
            if (event.target.files != null) {
                const image = URL.createObjectURL(event.target.files[0]);
                this.setState({ file: image });
                this.props.handleDetailsChange(field, image);
            }
        }
    };

    private currentLocation = (): void  => {
        const setLocation = (latitude: number, longitude: number): void => {
            this.setState({ coordinatesAttached: true });
            this.props.handleDetailsChange(DataFields.coordinates, [latitude, longitude]);
        };

        navigator.geolocation.getCurrentPosition(function(position) {
            setLocation(position.coords.latitude, position.coords.longitude);
        });
    };
}
