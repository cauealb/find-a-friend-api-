import type { Pet, PetCreate } from "../types/pet.ts";

export interface petRepository {
    create(data: PetCreate): Promise<Pet>
}