import { beforeEach, describe, expect, it } from "vitest";
import type { orgRepository } from "../../../repositories/org-repository.ts";
import { AuthenticateOrg } from "../use-cases/authenticate-org.ts";
import { InMemoryOrgRepository } from "../../../repositories/in-memory/in-memory-org-repository.ts";
import { hash } from 'bcrypt'
import { env } from "../../../env/index.ts";
import { InvalidCredentialsError } from "../../../errors/invalid-credentials-error.ts";
import { ResourceNotFoundError } from "../../../errors/resource-not-found-error.ts";

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

        await repository.create({
            nameOrg: 'Cauê Alves Org',
            email,
            password: await hash(password, env.SALT),
            address: 'Rua tal tal, 12',
            number: '11999999999',
        })

        const { org } = await sut.execute({ email, password })

        expect(org).toEqual(expect.objectContaining({
            nameOrg: 'Cauê Alves Org',
            email,
        }))
    })

    it("should be able validate invalid password", async () => {
        const email = 'cauealvesdev@gmail.com'
        const password = await hash('1234567', env.SALT)

        repository.create({
            nameOrg: 'Cauê Alves Org',
            email,
            password,
            address: 'Rua tal tal, 12',
            number: '11999999999',
        })

        await expect(async () => await sut.execute({ email, password: 'invalid-password' })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it("should be able validate invalid email", async () => {
        const password = '1234567'

        repository.create({
            nameOrg: 'Cauê Alves Org',
            email: 'cauealvesdev@gmail.com',
            password: await hash(password, env.SALT),
            address: 'Rua tal tal, 12',
            number: '11999999999',
        })

        await expect(async () => await sut.execute({ email: 'cauealvesdev1@gmail.com', password })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})