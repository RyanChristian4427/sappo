import {Server, Socket} from 'socket.io';
import {ChatMessage} from 'src/models/Message';

export default class ClientSocket {
    io: Server;

    constructor(io: Server) {
        this.io = io;
    }

    setUpSocketConnection = (): void => {
        this.io.on('connection',  (socket: Socket) => {
            this.onUserJoinedChat(socket);
        });
    };

    onUserJoinedChat = (socket: Socket): void => {
        socket.on('user_join', (newName: string) => {
            this.alertNewUserJoinedChat(newName);
        });
    };

    alertNewUserJoinedChat = (name: string): void => {
        this.io.emit(
            'new_user_join',
            name
        );
    };

    alertNewMessage = (message: ChatMessage): void => {
        this.io.emit('new_message', message);
    };
}
