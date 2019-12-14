import { observable, action } from 'mobx';
import { apiService } from 'ts-api-toolkit';

import {EmptyChatMessageBeforeSend} from 'models/ChatMessage';
import {AdditionalDetails} from 'models/Modal';
import {authStore} from 'stores/authStore';

export class MessageStore {

    @observable message = EmptyChatMessageBeforeSend;

    @action
    setAdditionalDetails(details: AdditionalDetails): void {
        this.message.abundance = details.abundance;
        this.message.coordinates = details.coordinates;
        this.message.species = details.species;
        this.message.temperature = details.temperature;
        this.message.file = details.file;
    }

    @action
    setText(text: string): void {
        this.message.text = text;
    }

    @action
    sendMessage(): void {
        this.message.username = authStore.currentUser;
        this.message.datetimestamp = new Date();
        apiService.post('/message', this.message)
            .then(() => this.clearMessage())
            .catch((err) => console.log(err));
    }

    @action
    clearMessage(): void {
        this.message = EmptyChatMessageBeforeSend;
    }
}

export const messageStore = new MessageStore();
