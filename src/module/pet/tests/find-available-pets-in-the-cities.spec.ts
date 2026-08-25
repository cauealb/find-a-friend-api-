import { beforeEach, describe, it } from "vitest";
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

    it("should be able find available pets in the cities", async () => {

    })
})