import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { DetailsModal } from 'components/Modal/DetailsModal';
import { BaseDetails, DataFields, ModalType } from 'models/Modal';
import { AuthStoreContext, MessageStoreContext } from 'stores';

import './Modal.scss';

interface IProps {
    closeModal: () => void;
    type: ModalType;
}

export const Modal: React.FC<IProps> = observer((props: IProps) => {
    const authStore = useContext(AuthStoreContext);
    const messageStore = useContext(MessageStoreContext);

    const [details, setDetails] = useState(BaseDetails);
    const [username, setUsername] = useState('');

    const handleDetailsChange = (field: DataFields, value: string | number | [number, number]): void => {
        // @ts-ignore
        //Have to suppress as there's no easy or clean way to let TS know we're sure of the types
        details[field] = value;
        setDetails(details);
    };

    const handleSave = (): void => {
        if (props.type === ModalType.selectUsername) {
            authStore.setUsername(username);
            props.closeModal();
        } else {
            messageStore.setAdditionalDetails(details);
            props.closeModal();
        }
    };

    return (
        <div className="modal is-active is-clipped">
            <div className="modal-background" onClick={props.closeModal} />
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">
                        {props.type === ModalType.selectUsername
                            ? 'Please Choose a User Name'
                            : 'Please Enter Any Other Details You May Have'}
                    </p>
                </header>
                <section className="modal-card-body">
                    {props.type === ModalType.selectUsername ? (
                        <input
                            className="input"
                            type="text"
                            placeholder="Your User Name"
                            onChange={(e): void => setUsername(e.target.value)}
                        />
                    ) : (
                        <DetailsModal handleDetailsChange={handleDetailsChange} />
                    )}
                </section>
                <footer className="modal-card-foot">
                    <button className="button" onClick={props.closeModal}>
                        Cancel
                    </button>
                    <button className="button is-success" onClick={handleSave}>
                        Save changes
                    </button>
                </footer>
            </div>
        </div>
    );
});
