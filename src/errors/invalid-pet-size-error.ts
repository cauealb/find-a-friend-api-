import { AppError } from "./app-error.ts";

export class InvalidPetSize extends AppError {
    constructor() {
        super('Invalid pet size.', 400)
    }
}