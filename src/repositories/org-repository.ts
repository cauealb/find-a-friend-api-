import type { Org } from "../types/org.ts";

export interface orgRepository {
    create(data: Org): Promise<Org>

    findByEmail(email: string): Promise<Org | null>
    findById(idOrg: string): Promise<Org | null>
}