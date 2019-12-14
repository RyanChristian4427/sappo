import { Server } from 'socket.io';
import ClientSocket from './clientSocket';

export const setUpSockets = (io: Server): ClientSocket => {
    const clientSocket = new ClientSocket(io);
    clientSocket.setUpSocketConnection();
    return clientSocket;
};
