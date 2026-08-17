import type { orgRepository } from "../../../repositories/org-repository.ts";
import type { Org } from "../../../types/org.ts";

interface CreateOrgRequest {
    nameOrg: string,
    email: string
    password: string
    address: string
    number: string
}

interface CreateOrgResponse {
    org: Org
}

export class CreateOrg {
    private readonly orgRepository: orgRepository

    constructor(repository: orgRepository) {
        this.orgRepository = repository
    }

    async execute({ nameOrg, email, password, address, number }: CreateOrgRequest): Promise<CreateOrgResponse> {
        const org = await this.orgRepository.create({ nameOrg, email, password, address, number })

        return { org }
    }
}