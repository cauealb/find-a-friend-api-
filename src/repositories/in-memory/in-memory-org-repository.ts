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
}