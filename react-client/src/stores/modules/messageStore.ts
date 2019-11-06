import { observable, action } from 'mobx';
import {AdditionalDetails, Message} from '../types/messageTypes';
import { apiService } from 'ts-api-toolkit';
import authStore from './authStore';

export class MessageStore {
    private baseMessage: Message = {
        username: '',
        text: '',
        abundance: 0,
        coordinates: [0, 0],
        species: '',
        temperature: 0,
    };

    @observable message = this.baseMessage;

    @action setAdditionalDetails(details: AdditionalDetails): void {
        this.message.abundance = details.abundance;
        this.message.coordinates = details.coordinates;
        this.message.species = details.species;
        this.message.temperature = details.temperature;
    }

    @action sendMessage(text: string): void {
        this.message.username = authStore.currentUser.Username;
        this.message.text = text;
        apiService.post('/message', this.message);
        this.clearMessage();
    }

    @action clearMessage(): void {
        this.message = this.baseMessage;
    }
}

export default new MessageStore();
