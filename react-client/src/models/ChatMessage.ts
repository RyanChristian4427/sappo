export interface ChatMessage {
    username: string;
    text: string;
    datetimestamp: Date;
    abundance: number;
    coordinates: [number, number];
    species: string;
    temperature: number;
}

export const BaseChatMessage: ChatMessage = {
    username: '',
    text: '',
    datetimestamp: new Date(0),
    abundance: 0,
    coordinates: [0, 0],
    species: '',
    temperature: 0,
};

// Json encoding changes Date object into string
export interface ReturnedChatMessage {
    username: string;
    text: string;
    datetimestamp: string;
    abundance: number;
    coordinates: [number, number];
    species: string;
    temperature: number;
}
