import type { Pet, PetCreate } from "../types/pet.ts";

export interface petRepository {
    create(data: Pet): Promise<Pet>

    findById(idPet: string): Promise<Pet | null>
    findAvailablePetsInTheCities(city: string): Promise<Pet[]>
}