import { beforeEach, describe, expect, it } from "vitest";
import type { petRepository } from "../../../repositories/pet-repository.ts";
import { FindAvailablePetsInTheCities } from "../use-cases/find-available-pets-in-the-cities.ts";
import { InMemoryPetRepository } from "../../../repositories/in-memory/in-memory-pet-repository.ts";
import { InMemoryOrgRepository } from "../../../repositories/in-memory/in-memory-org-repository.ts";

let petRepository: petRepository
let sut: FindAvailablePetsInTheCities

describe("Find available pets in the cities (unit)", () => {
    beforeEach(() => {
        petRepository = new InMemoryPetRepository(new InMemoryOrgRepository())
        sut = new FindAvailablePetsInTheCities(petRepository)
    })

    it.todo("should be able find available pets in the cities", async () => {
        await petRepository.create({
            namePet: 'Safira',
            age: 2,
            available: true,
            color: "Caramel",
            petSize: "Average",
            idOrg: 'org-01'
        })

        await petRepository.create({
            namePet: 'Lili',
            age: 3,
            available: true,
            color: "Striped",
            petSize: "Average",
            idOrg: 'org-01'
        })

        const { pets } = await sut.execute({ city: "São Paulo" })
        
        expect(pets).toHaveLength(2)
        expect(pets).toEqual([
            expect.objectContaining({
                namePet: 'Safira',
            }),
            expect.objectContaining({
                namePet: 'Lili',
            })
        ])
    })
})