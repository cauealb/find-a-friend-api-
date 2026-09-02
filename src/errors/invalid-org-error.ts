import { AppError } from "./app-error.ts";

export class InvalidOrg extends AppError {
    constructor() {
        super('Invalid org!', 400)
    }
}