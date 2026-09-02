import { InvalidCityError } from "../../../errors/invalid-city-error.ts";
import type { petRepository } from "../../../repositories/pet-repository.ts";
import type { Pet } from "../../../types/pet.ts";

interface FindPetByCharacteristicsRequest {
    age: number | null
    color: string | null
    size: string | null
    city: string
}

interface FindPetByCharacteristicsResponse {
    pets:  Pet[]
}

export class FindPetByCharacteristics {
    private readonly petRepository: petRepository

    constructor(repository: petRepository) {
        this.petRepository = repository
    }

    async execute({ age, color, size, city }: FindPetByCharacteristicsRequest): Promise<FindPetByCharacteristicsResponse> {
        if(city.length < 1) {
            throw new InvalidCityError()
        }

        const pets = await this.petRepository.findPetByCharacteristics({ age, color, size, city })

        return { pets }
    }
}