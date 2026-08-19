import { AppError } from "./app-error.ts";

export class ResourceNotFoundError extends AppError {
    constructor() {
        super('Resource not found', 404)
    }
}