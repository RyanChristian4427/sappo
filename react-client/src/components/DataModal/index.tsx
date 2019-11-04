import React from 'react';
import {AuthStore} from '../../stores/modules/authStore';
import socket from 'src/models/Sockets';

interface IProps {
    show: boolean;
    closeModal: () => void;
}

interface IState {
    abundance: number;
    species: string;
    coordinates: string;
    temperature: number;
}

enum DataFields {
    abundance = 'abundance',
    species = 'species',
    coordinates = 'coordinates',
    temperature = 'temperature',
}

export default class DataModal extends React.Component<IProps, IState> {

    constructor(props: IProps){
        super(props);
        this.state = {
            abundance: 0,
            species: '',
            coordinates: '',
            temperature: 0,
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
                            <p className="modal-card-title">Please Enter the Details</p>
                        </header>
                        <section className="modal-card-body">
                            <input className="input" type="text" placeholder="Abundance" onChange={this.handleChange(DataFields.abundance)} />
                            <input className="input" type="text" placeholder="Species" onChange={this.handleChange(DataFields.species)} />
                            <input className="input" type="text" placeholder="Coordinates" onChange={this.handleChange(DataFields.coordinates)} />
                            <input className="input" type="text" placeholder="Temperature" onChange={this.handleChange(DataFields.temperature)} />
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button" onClick={this.props.closeModal}>Cancel</button>
                            <button className="button is-success">Save changes</button>
                        </footer>
                    </div>
                </div>
            )
        }
    }

    private handleChange = (field: DataFields) => (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (field === DataFields.abundance || field === DataFields.species ||
            field === DataFields.coordinates || field === DataFields.temperature) {
            // @ts-ignore
            // Have to ts ignore here, as it can't detect that I guarantee [field] is indeed a string type and is in `state`
            this.setState({[field]: event.target.value});
        }
    };
}
