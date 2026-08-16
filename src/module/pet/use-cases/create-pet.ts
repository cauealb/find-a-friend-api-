import type { petRepository } from "../../../repositories/pet-repository.ts";
import type { ColorsPet, Pet, PetCreate, PetSize } from "../../../types/pet.ts";

interface CreatePetRequest {
    namePet: string
    age: number
    petSize: PetSize
    available: boolean
    color: ColorsPet
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
        const pet = await this.petRepository.create({
            namePet,
            age,
            available,
            color,
            idOrg,
            petSize
        })

        return { pet }
    }
}