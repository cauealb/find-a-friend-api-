import { beforeEach, describe, expect, it } from "vitest";
import type { orgRepository } from "../../../repositories/org-repository.ts";
import { AuthenticateOrg } from "../use-cases/authenticate-org.ts";
import { InMemoryOrgRepository } from "../../../repositories/in-memory/in-memory-org-repository.ts";

let repository: orgRepository
let sut: AuthenticateOrg

describe("Authenticate org (unit)", () => {
    beforeEach(() => {
        repository = new InMemoryOrgRepository()
        sut = new AuthenticateOrg(repository)
    })

    it("should be able authentica in system", async () => {
        const email = 'cauealvesdev@gmail.com'
        const password = '1234567'

        const user = repository.create({
            nameOrg: 'Cauê Alves Org',
            email,
            password,
            address: 'Rua tal tal, 12',
            number: '11999999999',
        })

        const { org } = await sut.execute({ email, password })

        expect(org).toEqual(expect.objectContaining({
            nameOrg: 'Cauê Alves Org',
            email,
            password,
        }))
    })

    it("should be able validate invalid password", async () => {
        const email = 'cauealvesdev@gmail.com'
        const password = '1234567'

        const user = repository.create({
            nameOrg: 'Cauê Alves Org',
            email,
            password,
            address: 'Rua tal tal, 12',
            number: '11999999999',
        })

        await expect(async () => await sut.execute({ email, password: 'invalid-password' })).rejects.toBeInstanceOf(Error)
    })
})