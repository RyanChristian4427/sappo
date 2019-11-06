import { observable, action } from 'mobx';
import { apiService } from 'ts-api-toolkit';

import {BaseChatMessage} from 'src/models/ChatMessage';
import {AdditionalDetails} from 'src/models/Modal';
import authStore from 'src/stores/modules/authStore';

export class MessageStore {

    @observable message = BaseChatMessage;

    @action setAdditionalDetails(details: AdditionalDetails): void {
        this.message.abundance = details.abundance;
        this.message.coordinates = details.coordinates;
        this.message.species = details.species;
        this.message.temperature = details.temperature;
    }

    @action sendMessage(text: string): void {
        this.message.username = authStore.currentUser;
        this.message.text = text;
        this.message.datetimestamp = new Date();
        apiService.post('/message', this.message);
        this.clearMessage();
    }

    @action clearMessage(): void {
        this.message = BaseChatMessage;
    }
}

export default new MessageStore();
