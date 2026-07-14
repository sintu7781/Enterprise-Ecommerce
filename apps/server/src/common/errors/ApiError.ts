import { StatusCodes } from "http-status-codes";

export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly errors?: unknown;

    constructor(
        statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
        message = "Something went wrong",
        errors?: unknown,
        isOperational = true
    ) {
        super(message);

        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.errors = errors;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }
}