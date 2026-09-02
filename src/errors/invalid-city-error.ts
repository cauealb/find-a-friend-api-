import { AppError } from "./app-error.ts";

export class InvalidCityError extends AppError {
    constructor() {
        super('Invalid city.', 400)
    }
}