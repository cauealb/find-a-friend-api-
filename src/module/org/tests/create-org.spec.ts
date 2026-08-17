import { beforeEach, describe, expect, it } from "vitest";
import type { orgRepository } from "../../../repositories/org-repository.ts";
import { CreateOrg } from "../use-cases/create-org.ts";
import { InMemoryOrgRepository } from "../../../repositories/in-memory/in-memory-org-repository.ts";

let repository: orgRepository
let sut: CreateOrg

describe("Create org (unit)", async () => {
    beforeEach(() => {
        repository = new InMemoryOrgRepository()
        sut = new CreateOrg(repository)
    })

    it("should be able create a org", async () => {
        const { org } = await sut.execute({
            nameOrg: 'Cauê Alves Org',
            email: 'cauealvesdev@gmail.com',
            password: '1234567',
            address: 'Rua tal tal, 12',
            number: '11999999999',
        })

        expect(org).toEqual(expect.objectContaining({
            nameOrg: 'Cauê Alves Org',
            email: 'cauealvesdev@gmail.com',
        }))
    })
})