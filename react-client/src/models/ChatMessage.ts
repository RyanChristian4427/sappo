export interface ChatMessage {
    username: string;
    message: string;
    abundance: number;
    coordinates: [number, number];
    species: string;
    temperature: number;
}
