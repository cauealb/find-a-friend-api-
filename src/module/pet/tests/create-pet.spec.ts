import { describe, beforeEach, it, expect } from "vitest";
import type { petRepository } from "../../../repositories/pet-repository.ts";
import { CreatePet } from "../use-cases/create-pet.ts";
import { InMemoryPetRepository } from "../../../repositories/in-memory/in-memory-pet-repository.ts";
import { InvalidPetSize } from "../../../errors/invalid-pet-size-error.ts";
import { InvalidPetColor } from "../../../errors/invalid-pet-color-error.ts";
import { InMemoryOrgRepository } from "../../../repositories/in-memory/in-memory-org-repository.ts";

let repository: petRepository
let sut: CreatePet

describe("Create pet (unit)", () => {
    beforeEach(() => {
        repository = new InMemoryPetRepository(new InMemoryOrgRepository())
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

    it("should be able validate size of pet", async () => {
        await expect(async () => {
            await sut.execute({
                namePet: 'Safira',
                age: 2,
                available: true,
                color: "Caramel",
                petSize: "invalid-size",
                idOrg: 'org-01'
            })
        }).rejects.toBeInstanceOf(InvalidPetSize)
    })

    it("should be able validate color of pet", async () => {
        await expect(async () => {
            await sut.execute({
                namePet: 'Safira',
                age: 2,
                available: true,
                color: "invalid-color",
                petSize: "Average",
                idOrg: 'org-01'
            })
        }).rejects.toBeInstanceOf(InvalidPetColor)
    })

    it.todo("should be able validate if org exist")
})