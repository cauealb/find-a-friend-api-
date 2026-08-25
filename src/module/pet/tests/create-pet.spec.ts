import { describe, beforeEach, it, expect } from "vitest";
import type { petRepository } from "../../../repositories/pet-repository.ts";
import { CreatePet } from "../use-cases/create-pet.ts";
import { InMemoryPetRepository } from "../../../repositories/in-memory/in-memory-pet-repository.ts";
import { InvalidPetSize } from "../../../errors/invalid-pet-size-error.ts";
import { InvalidPetColor } from "../../../errors/invalid-pet-color-error.ts";
import { InMemoryOrgRepository } from "../../../repositories/in-memory/in-memory-org-repository.ts";
import type { orgRepository } from "../../../repositories/org-repository.ts";
import { InvalidOrg } from "../../../errors/invalid-org-error.ts";

let petRepository: petRepository
let orgRepository: orgRepository
let sut: CreatePet

describe("Create pet (unit)", () => {
    beforeEach(async () => {
        orgRepository = new InMemoryOrgRepository()
        petRepository = new InMemoryPetRepository(new InMemoryOrgRepository())

        sut = new CreatePet(petRepository, orgRepository)

        await orgRepository.create({
            nameOrg: 'Cauê Alves Org',
            email: 'cauealvesdev@gmail.com',
            password: '1234567',
            address: 'Rua tal tal, 12',
            city: 'São Paulo',
            number: '11999999999',
        })
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

    it("should be able validate if org exist", async () => {
        await expect(async () => {
            await sut.execute({
                namePet: 'Safira',
                age: 2,
                available: true,
                color: "White",
                petSize: "Average",
                idOrg: 'invalid-org'
            })
        }).rejects.toBeInstanceOf(InvalidOrg)
    })
})