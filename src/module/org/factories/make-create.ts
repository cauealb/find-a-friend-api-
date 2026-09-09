import { InMemoryOrgRepository } from "../../../repositories/in-memory/in-memory-org-repository.ts";
import { CreateOrg } from "../use-cases/create-org.ts";

export function MakeCreate() {
    const repository = new InMemoryOrgRepository()
    const useCase = new CreateOrg(repository)

    return useCase
}