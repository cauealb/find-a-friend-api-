import { describe, beforeEach, it, expect } from "vitest";
import type { petRepository } from "../../../repositories/pet-repository.ts";
import { CreatePet } from "../use-cases/create-pet.ts";
import { InMemoryPetRepository } from "../../../repositories/in-memory/in-memory-pet-repository.ts";
import type { ColorsPet, PetSize } from "../../../types/pet.ts";

let repository: petRepository
let sut: CreatePet

describe("Create pet (unit)", () => {
    beforeEach(() => {
        repository = new InMemoryPetRepository()
        sut = new CreatePet(repository)
    })

    it("should be able create a pet", async () => {
        const { pet } = await sut.execute({
                namePet: 'Safira',
                age: 2,
                available: true,
                color: "Caramel",
                petSize: "Average",
                idOrg: 'org-01'
            })

        expect(pet).toEqual(expect.objectContaining({
            namePet: 'Safira',
            available: true,
        }))
    })
})