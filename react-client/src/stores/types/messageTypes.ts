export interface Message {
    username: string;
    text: string;
    abundance?: number;
    coordinates?: [number, number];
    species?: string;
    temperature?: number;
}

export interface AdditionalDetails {
    abundance: number;
    coordinates: [number, number];
    species: string;
    temperature: number;
}
