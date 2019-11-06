export enum ChatEvent {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    MESSAGE = 'message'
}

export interface ChatMessage {
    username: string;
    message: string;
    abundance: number;
    coordinates: [number, number];
    species: string;
    temperature: number;
}
