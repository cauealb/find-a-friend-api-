import { InvalidPetColor } from "../../../errors/invalid-pet-color-error.ts";
import { InvalidPetSize } from "../../../errors/invalid-pet-size-error.ts";
import type { petRepository } from "../../../repositories/pet-repository.ts";
import { ColorsPet, SizePet, type Pet } from "../../../types/pet.ts";

interface CreatePetRequest {
    namePet: string
    age: number
    petSize: string
    available: boolean
    color: string
    idOrg: string
}

interface CreatePetResponse {
    pet: Pet
}

export class CreatePet {
    private readonly petRepository: petRepository

    constructor(repository: petRepository) {
        this.petRepository = repository
    }

    async execute({ namePet, age, petSize, available, color, idOrg }: CreatePetRequest): Promise<CreatePetResponse> {
        if(!Object.values(SizePet).includes(petSize as SizePet)) {
            throw new InvalidPetSize()
        }

        if(!Object.values(ColorsPet).includes(color as ColorsPet)) {
            throw new InvalidPetColor()
        }

        const pet = await this.petRepository.create({ namePet, age, available, color, idOrg, petSize })

        return { pet }
    }
}