import { observable, action } from 'mobx';
import User from '../../models/User';
import socket from '../../models/Sockets';

export class AuthStore {
    @observable currentUser = new User('');

    @action setUsername(username: string): void {
        this.currentUser = new User(username);
        socket.emit('change_username', {Username: username});
    }
}

export default new AuthStore();
