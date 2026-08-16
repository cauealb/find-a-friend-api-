
export enum PetSize {
    "Very Small",
    "Small",
    "Average",
    "Big",
    "Very Big"
}

export enum ColorsPet {
    "Black",
    "White",
    "Caramel",
    "Striped"
}

export interface PetCreate {
    namePet: string
    age: number
    petSize: string
    available: boolean
    color: string
    idOrg: string
}

export interface Pet extends PetCreate {
    idPet: string
}