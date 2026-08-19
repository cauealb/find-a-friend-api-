import type { orgRepository } from "../../../repositories/org-repository.ts";
import type { Org } from "../../../types/org.ts";

interface AuthenticateOrgRequest {
    email: string
    password: string
}

interface AuthenticateOrgResponse {
    org: Org
}

export class AuthenticateOrg {
    private readonly orgRepository: orgRepository

    constructor(repository: orgRepository) {
        this.orgRepository = repository
    }

    async execute({ email, password }: AuthenticateOrgRequest): Promise<AuthenticateOrgResponse> {
        const org = await this.orgRepository.findByEmail(email);

        if(!org) {
            throw new Error()
        }

        return { org }
    }
}