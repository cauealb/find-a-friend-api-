import { beforeEach, describe, expect, it } from "vitest";
import type { petRepository } from "../../../repositories/pet-repository.ts";
import { FindPetByCharacteristics } from "../use-cases/find-pet-by-characteristics.ts";
import { InMemoryPetRepository } from "../../../repositories/in-memory/in-memory-pet-repository.ts";
import { InMemoryOrgRepository } from "../../../repositories/in-memory/in-memory-org-repository.ts";

let repository: petRepository
let sut: FindPetByCharacteristics

describe("Find pet by characteristics (unit)", () => {
    beforeEach(async () => {
        repository = new InMemoryPetRepository(new InMemoryOrgRepository())
        sut = new FindPetByCharacteristics(repository)

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
        const { pets } = await sut.execute({ age: 2, color: null, size: null })

        expect(pets).toHaveLength(1)
        expect(pets[0]).toEqual(expect.objectContaining({
            namePet: 'Safira',
        }))
    })

    it("should be able find pet by color", async () => {
        const { pets } = await sut.execute({ age: null, color: "Striped", size: null })

        expect(pets).toHaveLength(1)
        expect(pets).toEqual([
            expect.objectContaining({
                namePet: 'Lili',
            })
        ])
    })

    it("should be able find pet by size", async () => {
        const { pets } = await sut.execute({ age: null, color: null, size: "Average" })

        expect(pets).toHaveLength(2)
        expect(pets).toEqual([
            expect.objectContaining({
                namePet: 'Safira'
            }),
            expect.objectContaining({
                namePet: 'Lili'
            })
        ])
    })

    it("should be able find nothing pet", async () => {
        const { pets } = await sut.execute({ age: null, color: null, size: null })

        expect(pets).toHaveLength(0)
    })

    it("should be able find with more filters", async () => {
        const { pets } = await sut.execute({ age: 2, color: "Caramel", size: null })

        expect(pets).toHaveLength(1)
        expect(pets).toEqual([
            expect.objectContaining({
                namePet: 'Safira'
            })
        ])
    })
})