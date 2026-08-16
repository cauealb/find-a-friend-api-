
export enum SizePet {
    "Very Small" = "Very Small",
    Small = "Small",
    Average = "Average",
    Big = "Big",
    "Very Big" = "Very Big"
}

export enum ColorsPet {
    Black = "Black",
    White = "White",
    Caramel = "Caramel",
    Striped = "Striped"
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
    idPet?: string
}