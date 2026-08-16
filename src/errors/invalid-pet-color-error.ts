import { AppError } from "./app-error.ts";

export class InvalidPetColor extends AppError {
    constructor() {
        super('Invalid pet color', 400)
    }
}