import type { Pet } from "../../types/pet.ts";
import type { findPetByCharacteristicsRequest, petRepository } from "../pet-repository.ts";
import type { InMemoryOrgRepository } from "./in-memory-org-repository.ts";

export class InMemoryPetRepository implements petRepository {
    private item: Pet[] = []
    private readonly InMemoryOrgRepository: InMemoryOrgRepository

    constructor(InMemoryOrgRepository: InMemoryOrgRepository) {
        this.InMemoryOrgRepository = InMemoryOrgRepository
    }

    async create(data: Pet) {
        const pet = {
            ...data,
            idPet: data.idPet ?? 'idPet-01',
        }

        this.item.push(pet)
        return pet
    }

    async findById(idPet: string): Promise<Pet | null> {
        const pet = this.item.find(item => item.idPet === idPet)

        if(!pet) return null

        return pet
    }

    async findAvailablePetsInTheCities(city: string) {
        return this.item.filter(pet => {
            const org = this.InMemoryOrgRepository.item.find(
                o => o.idOrg === pet.idOrg
            )

            return pet.available && org?.city === city
        })
    }

    async findPetByCharacteristics({ age, color, size }: findPetByCharacteristicsRequest): Promise<Pet[]> {
        return this.item.filter(item => item.age === age || item.color === color || item.petSize === size)
    }
}