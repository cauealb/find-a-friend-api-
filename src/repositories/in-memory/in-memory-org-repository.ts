import type { Org } from "../../types/org.ts";
import type { orgRepository } from "../org-repository.ts";

export class InMemoryOrgRepository implements orgRepository {
    public readonly item: Org[] = []

    async create(data: Org) {
        const org = {
            ...data,
            idOrg: data.idOrg ?? 'org-01'
        }

        this.item.push(org)
        return org
    }

    async findByEmail(email: string): Promise<Org | null> {
        const org = this.item.find(item => item.email === email)

        if(!org) return null

        return org
    }

    async findById(idOrg: string): Promise<Org | null> {
        const org = this.item.find(item => item.idOrg === idOrg)

        if(!org) return null

        return org
    }
}