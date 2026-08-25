import { beforeEach, describe, expect, it } from "vitest";
import type { petRepository } from "../../../repositories/pet-repository.ts";
import { FindAvailablePetsInTheCities } from "../use-cases/find-available-pets-in-the-cities.ts";
import { InMemoryPetRepository } from "../../../repositories/in-memory/in-memory-pet-repository.ts";
import { InMemoryOrgRepository } from "../../../repositories/in-memory/in-memory-org-repository.ts";
import type { orgRepository } from "../../../repositories/org-repository.ts";

let orgRepository: InMemoryOrgRepository
let petRepository: petRepository
let sut: FindAvailablePetsInTheCities

describe("Find available pets in the cities (unit)", () => {
    beforeEach(() => {
        orgRepository = new InMemoryOrgRepository()

        petRepository = new InMemoryPetRepository(orgRepository)
        sut = new FindAvailablePetsInTheCities(petRepository)
    })

    it("should be able find available pets in the cities", async () => {
        await orgRepository.create({
            idOrg: 'org-01',
            nameOrg: 'Cauê Alves Org',
            email: 'cauealvesdev@gmail.com',
            password: '1234567',
            address: 'Rua tal tal, 12',
            city: 'São Paulo',
            number: '11999999999',
        })

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

    it("should be able find nothing pets", async () => {
        await orgRepository.create({
            idOrg: 'org-01',
            nameOrg: 'Cauê Alves Org',
            email: 'cauealvesdev@gmail.com',
            password: '1234567',
            address: 'Rua tal tal, 12',
            city: 'São Paulo',
            number: '11999999999',
        })

        await petRepository.create({
            namePet: 'Safira',
            age: 2,
            available: true,
            color: "Caramel",
            petSize: "Average",
            idOrg: 'org-02'
        })

        await petRepository.create({
            namePet: 'Lili',
            age: 3,
            available: true,
            color: "Striped",
            petSize: "Average",
            idOrg: 'org-02'
        })

        const { pets } = await sut.execute({ city: "São Paulo" })

        expect(pets).toHaveLength(0)
    })

    it("should be able find only one pets", async () => {
        await orgRepository.create({
            idOrg: 'org-01',
            nameOrg: 'Cauê Alves Org',
            email: 'cauealvesdev@gmail.com',
            password: '1234567',
            address: 'Rua tal tal, 12',
            city: 'São Paulo',
            number: '11999999999',
        })

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
            idOrg: 'org-02'
        })

        const { pets } = await sut.execute({ city: "São Paulo" })

        expect(pets).toHaveLength(1)
    })
})