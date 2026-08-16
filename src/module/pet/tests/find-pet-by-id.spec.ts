import { beforeEach, describe, expect, it } from "vitest";
import type { petRepository } from "../../../repositories/pet-repository.ts";
import { FindPetById } from "../use-cases/find-pet-by-id.ts";
import { InMemoryPetRepository } from "../../../repositories/in-memory/in-memory-pet-repository.ts";

let repository: petRepository
let sut: FindPetById

describe("Find pet by id (unit)", () => {
    beforeEach(() => {
        repository = new InMemoryPetRepository()
        sut = new FindPetById(repository)
    })

    it("should be able find pet by id", async () => {
        await repository.create({
            idPet: 'idPet-01',
            namePet: 'Safira',
            age: 2,
            available: true,
            color: "Caramel",
            petSize: "Average",
            idOrg: 'org-01'
        })

        const { pet } = await sut.execute({ idPet: 'idPet-01' })
        expect(pet).toEqual(expect.objectContaining({
            namePet: 'Safira',
        }))
    })
})