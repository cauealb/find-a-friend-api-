import { env } from "../../../env/index.ts";
import type { orgRepository } from "../../../repositories/org-repository.ts";
import type { Org } from "../../../types/org.ts";
import { hash } from "bcrypt";

interface CreateOrgRequest {
    nameOrg: string,
    email: string
    password: string
    address: string
    number: string
    city: string
}

interface CreateOrgResponse {
    org: Org
}

export class CreateOrg {
    private readonly orgRepository: orgRepository

    constructor(repository: orgRepository) {
        this.orgRepository = repository
    }

    async execute({ nameOrg, email, password, address, number, city }: CreateOrgRequest): Promise<CreateOrgResponse> {
        const hashPassword = await hash(password, env.SALT)

        const org = await this.orgRepository.create({ nameOrg, email, password: hashPassword, address, number, city })

        return { org }
    }
}