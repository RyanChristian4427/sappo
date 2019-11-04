import { observable, action } from 'mobx';
import {Message} from '../types/messageTypes';
import {apiService} from 'ts-api-toolkit';

export class MessageStore {
    @observable message: Message = {
        message: '',
        username: '',
        abundance: 0,
        coordinates: '(0,0)',
        species: '',
        temperature: 0,
    };

    @action sendMessage(): void {
        apiService.post('/message', this.message).then((response) => console.log(response))
    }
}

export default new MessageStore();
