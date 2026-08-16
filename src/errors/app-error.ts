export class AppError extends Error {
    private readonly statusCode: number

    constructor(msg: string, statusCode: number) {
        super(msg)
        this.statusCode = statusCode
    }
}