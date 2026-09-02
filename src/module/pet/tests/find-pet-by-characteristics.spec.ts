import { beforeEach, describe, expect, it } from "vitest";
import type { petRepository } from "../../../repositories/pet-repository.ts";
import { FindPetByCharacteristics } from "../use-cases/find-pet-by-characteristics.ts";
import { InMemoryPetRepository } from "../../../repositories/in-memory/in-memory-pet-repository.ts";
import { InMemoryOrgRepository } from "../../../repositories/in-memory/in-memory-org-repository.ts";
import type { orgRepository } from "../../../repositories/org-repository.ts";
import { InvalidCityError } from "../../../errors/invalid-city-error.ts";

let repository: petRepository
let orgRepository: InMemoryOrgRepository
let sut: FindPetByCharacteristics

describe("Find pet by characteristics (unit)", () => {
    beforeEach(async () => {
        orgRepository = new InMemoryOrgRepository()

        repository = new InMemoryPetRepository(orgRepository)
        sut = new FindPetByCharacteristics(repository)

        await orgRepository.create({
            idOrg: 'org-01',
            nameOrg: 'Cauê Alves Org',
            email: 'cauealvesdev@gmail.com',
            password: '1234567',
            address: 'Rua tal tal, 12',
            city: "São Paulo",
            number: '11999999999',
        })

        await orgRepository.create({
            idOrg: 'org-02',
            nameOrg: 'Cauê Alves Org 2',
            email: 'cauealvesdev@gmail.com',
            password: '1234567',
            address: 'Rua tal tal, 12',
            city: "Rio de Janeiro",
            number: '11999999999',
        })

        await repository.create({
            namePet: 'Safira',
            age: 2,
            available: true,
            color: "Caramel",
            petSize: "Average",
            idOrg: 'org-01'
        })

        await repository.create({
            namePet: 'Lili',
            age: 3,
            available: true,
            color: "Striped",
            petSize: "Average",
            idOrg: 'org-02'
        })
    })

    it("should be able find pet by age", async () => {
        const { pets } = await sut.execute({ age: 2, color: null, size: null, city: "São Paulo" })

        expect(pets).toHaveLength(1)
        expect(pets[0]).toEqual(expect.objectContaining({
            namePet: 'Safira',
        }))
    })

    it("should be able find pet by color", async () => {
        const { pets } = await sut.execute({ age: null, color: "Striped", size: null, city: "Rio de Janeiro" })

        expect(pets).toHaveLength(1)
        expect(pets).toEqual([
            expect.objectContaining({
                namePet: 'Lili',
            })
        ])
    })

    it("should be able find pet by size", async () => {
        const { pets } = await sut.execute({ age: null, color: null, size: "Average", city: "São Paulo" })

        expect(pets).toHaveLength(1)
        expect(pets).toEqual([
            expect.objectContaining({
                namePet: 'Safira'
            })
        ])
    })

    it("should be able find nothing pet", async () => {
        const { pets } = await sut.execute({ age: null, color: null, size: null, city: "Rio Grande do Sul" })

        expect(pets).toHaveLength(0)
    })

    it("should be able find with more filters", async () => {
        const { pets } = await sut.execute({ age: 2, color: "Caramel", size: null, city: "São Paulo" })

        expect(pets).toHaveLength(1)
        expect(pets).toEqual([
            expect.objectContaining({
                namePet: 'Safira'
            })
        ])
    })

    it("should be able find by city", async () => {
        const { pets } = await sut.execute({ age: null, color: null, size: null, city: "Rio de Janeiro" })

        expect(pets).toHaveLength(1)
        expect(pets).toEqual([
            expect.objectContaining({
                namePet: 'Lili'
            })
        ])
    })

    it("should be able validate error city", async () => {
        await expect(async () => {
            await sut.execute({ age: null, color: null, size: null, city: "" })
        }).rejects.toBeInstanceOf(InvalidCityError)
    })
})