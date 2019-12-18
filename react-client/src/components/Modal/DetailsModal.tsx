import React, {useState} from 'react';

import {DataFields} from 'models/Modal';

import './Modal.scss';


interface IProps {
    handleDetailsChange: (field: DataFields, value: string | number | [number, number]) => void;
}

export const DetailsModal: React.FC<IProps> = (props: IProps) => {
    const [coordinatesAttached, setCoordinatesAttached] = useState(false);
    const [file, setFile] = useState();
    const [validationError, setValidationError] = useState(false);


    // Uses dataFields as an enum to decide which input actually needs to be updated. Got this idea from a project I did in Rust,
    // where you're forced to use enums if you want options like this.
    const handleChange = (field: DataFields) => (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (field === DataFields.abundance || field === DataFields.temperature) {
            const reg = new RegExp('^$|^[0-9]+$');
            if (!reg.test(event.target.value)) setValidationError(true);
            else {
                setValidationError(false);
                props.handleDetailsChange(field, Number(event.target.value));
            }
        } else if (field === DataFields.species){
            props.handleDetailsChange(field, event.target.value);
        } else if (field === DataFields.file) {
            if (event.target.files != null) {
                const reader = new FileReader();
                reader.readAsDataURL(event.target.files[0]);
                reader.onload = (): void => {
                    const base64 = reader.result!!.toString();
                    setFile(base64);
                    props.handleDetailsChange(field, base64);
                };
            }
        }
    };

    const currentLocation = (): void  => {
        const setLocation = (latitude: number, longitude: number): void => {
            setCoordinatesAttached(true);
            props.handleDetailsChange(DataFields.coordinates, [latitude, longitude]);
        };

        navigator.geolocation.getCurrentPosition(function(position) {
            setLocation(position.coords.latitude, position.coords.longitude);
        });
    };

    return (
        <React.Fragment>
            <input className="input" type="text" placeholder="Abundance" onChange={handleChange(DataFields.abundance)} />
            <input className="input" type="text" placeholder="Species" onChange={handleChange(DataFields.species)} />
            <div className="has-text-centered">
                {(coordinatesAttached)
                    ? <button className="button is-deep-space-sparkle">Coordinates Successfully Attached!</button>
                    : <button className="button is-xanadu-light" onClick={currentLocation}>Attach Current Coordinates</button>
                }
            </div>
            <input className="input" type="text" placeholder="Temperature as Degrees in Celsius" onChange={handleChange(DataFields.temperature)} />
            <div className="file is-centered is-xanadu-light">
                <label className="file-label">
                    <input className="file-input" type="file" name="resume" onChange={handleChange(DataFields.file)}/>
                    <span className="file-cta">
                        <span className="file-label">Choose a file…</span>
                    </span>
                </label>
            </div>
            {file &&
                <div className="container preview-container">
                    <h2 className="has-text-centered">Preview:</h2>
                    <img src={file} alt="Upload preview"/>
                </div>
            }
            {validationError &&
                <h2 className="error">
                    The temperature and abundance fields both can only be numbers, or empty
                </h2>
            }
        </React.Fragment>
    );
};
