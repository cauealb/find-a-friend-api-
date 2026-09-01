import type { petRepository } from "../../../repositories/pet-repository.ts";
import type { Pet } from "../../../types/pet.ts";

interface FindPetByCharacteristicsRequest {
    age: number | null
    color: string | null
    size: string | null
}

interface FindPetByCharacteristicsResponse {
    pets:  Pet[]
}

export class FindPetByCharacteristics {
    private readonly petRepository: petRepository

    constructor(repository: petRepository) {
        this.petRepository = repository
    }

    async execute({ age, color, size }: FindPetByCharacteristicsRequest): Promise<FindPetByCharacteristicsResponse> {
        const pets = await this.petRepository.findPetByCharacteristics({ age, color, size })

        return { pets }
    }
}