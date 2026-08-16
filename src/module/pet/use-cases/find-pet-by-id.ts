import type { petRepository } from "../../../repositories/pet-repository.ts";
import type { Pet } from "../../../types/pet.ts";

export interface FindPetByIdRequest {
    idPet: string
}

export interface FindPetByIdResponse {
    pet: Pet | null
}

export class FindPetById {
    private readonly petRepository: petRepository

    constructor(repository: petRepository) {
        this.petRepository = repository
    }

    async execute({ idPet }: FindPetByIdRequest): Promise<FindPetByIdResponse> {
        const pet = await this.petRepository.findById(idPet)

        return { pet }
    }
}