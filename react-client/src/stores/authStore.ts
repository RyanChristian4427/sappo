import { observable, action } from 'mobx';

import socket from 'models/Sockets';

class AuthStore {
    @observable currentUser = '';

    @action setUsername(username: string): void {
        this.currentUser = username;
        socket.emit('user_join', username);
    }
}

export const authStore = new AuthStore();
