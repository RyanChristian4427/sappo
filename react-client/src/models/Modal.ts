export enum ModalType {
    selectUsername,
    additionalDetails,
}

export interface AdditionalDetails {
    abundance: number;
    species: string;
    coordinates: [number, number];
    temperature: number;
}

export const BaseDetails: AdditionalDetails = {
    abundance: 0,
    species: '',
    coordinates: [0, 0],
    temperature: 0,
};
