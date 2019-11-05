import { observable, action } from 'mobx';
import { Message } from '../types/messageTypes';
import { apiService } from 'ts-api-toolkit';
import authStore from './authStore';

export class MessageStore {
    private baseMessage: Message = {
        message: '',
        username: '',
        abundance: 0,
        coordinates: '(0,0)',
        species: '',
        temperature: 0,
    };

    @observable message = this.baseMessage;

    @action setAdditionalDetails(details: {abundance: number; coordinates: string; species: string; temperature: number}): void {
        this.message.abundance = details.abundance;
        this.message.coordinates = details.coordinates;
        this.message.species = details.species;
        this.message.temperature = details.temperature;
    }

    @action sendMessage(message: string): void {
        this.message.username = authStore.currentUser.Username;
        this.message.message = message;
        apiService.post('/message', this.message).then((response) => console.log(response));
        this.clearMessage();
    }

    @action clearMessage(): void {
        this.message = this.baseMessage;
    }
}

export default new MessageStore();
