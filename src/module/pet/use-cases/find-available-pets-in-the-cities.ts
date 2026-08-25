import type { petRepository } from "../../../repositories/pet-repository.ts";
import type { Pet } from "../../../types/pet.ts";

interface FindAvailablePetsInTheCitiesRequest {
    city: string
}

interface FindAvailablePetsInTheCitiesResponse {
    pets: Pet[]
}

export class FindAvailablePetsInTheCities {
    private readonly petRepository: petRepository

    constructor(repository: petRepository) {
        this.petRepository = repository
    }

    async execute({ city }: FindAvailablePetsInTheCitiesRequest): Promise<FindAvailablePetsInTheCitiesResponse> {
        const pets = await this.petRepository.findAvailablePetsInTheCities(city)

        return { pets }
    }
}