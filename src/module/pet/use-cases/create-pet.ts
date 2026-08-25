import { InvalidOrg } from "../../../errors/invalid-org-error.ts";
import { InvalidPetColor } from "../../../errors/invalid-pet-color-error.ts";
import { InvalidPetSize } from "../../../errors/invalid-pet-size-error.ts";
import type { orgRepository } from "../../../repositories/org-repository.ts";
import type { petRepository } from "../../../repositories/pet-repository.ts";
import { ColorsPet, SizePet, type Pet } from "../../../types/pet.ts";

interface CreatePetRequest {
    namePet: string
    age: number
    petSize: string
    available: boolean
    color: string
    idOrg: string
}

interface CreatePetResponse {
    pet: Pet
}

export class CreatePet {
    private readonly petRepository: petRepository
    private readonly orgRepository: orgRepository

    constructor(petRepository: petRepository, orgRepository: orgRepository) {
        this.petRepository = petRepository
        this.orgRepository = orgRepository
    }

    async execute({ namePet, age, petSize, available, color, idOrg }: CreatePetRequest): Promise<CreatePetResponse> {
        if(!Object.values(SizePet).includes(petSize as SizePet)) {
            throw new InvalidPetSize()
        }

        if(!Object.values(ColorsPet).includes(color as ColorsPet)) {
            throw new InvalidPetColor()
        }

        const doesExistsOrg = await this.orgRepository.findById(idOrg)
        if(!doesExistsOrg) {
            throw new InvalidOrg()
        }

        const pet = await this.petRepository.create({ namePet, age, available, color, idOrg, petSize })

        return { pet }
    }
}