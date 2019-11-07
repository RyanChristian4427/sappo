export enum ModalType {
    selectUsername,
    additionalDetails,
}

export enum DataFields {
    abundance = 'abundance',
    file = 'file',
    species = 'species',
    temperature = 'temperature',
    username = 'username',
}

export interface AdditionalDetails {
    abundance: number;
    species: string;
    coordinates: [number, number];
    temperature: number;
    file: string;
}

export const BaseDetails: AdditionalDetails = {
    abundance: 0,
    species: '',
    coordinates: [0, 0],
    temperature: 0,
    file: '',
};
