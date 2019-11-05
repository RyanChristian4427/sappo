export interface Message {
    username: string;
    message: string;
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
