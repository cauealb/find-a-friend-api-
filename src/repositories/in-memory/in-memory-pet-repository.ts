import type { PetCreate, Pet } from "../../types/pet.ts";
import type { petRepository } from "../pet-repository.ts";

export class InMemoryPetRepository implements petRepository {
    private item: Pet[] = []

    async create(data: PetCreate) {
        const pet = {
            idPet: 'org-01',
            ...data
        }

        this.item.push(pet)
        return pet
    }
}