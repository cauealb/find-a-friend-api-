import type { PetCreate, Pet } from "../../types/pet.ts";
import type { petRepository } from "../pet-repository.ts";

export class InMemoryPetRepository implements petRepository {
    private item: Pet[] = []

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
}