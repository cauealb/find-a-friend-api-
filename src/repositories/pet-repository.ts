import type { Pet } from "../types/pet.ts";

export interface findPetByCharacteristicsRequest {
    age: number | null
    color: string | null
    size: string | null
    city: string
}

export interface petRepository {
    create(data: Pet): Promise<Pet>

    findById(idPet: string): Promise<Pet | null>
    findAvailablePetsInTheCities(city: string): Promise<Pet[]>
    findPetByCharacteristics({ age, color, size, city }: findPetByCharacteristicsRequest): Promise<Pet[]>
}