import { StatusCodes } from "http-status-codes";
import { ApiError } from "./ApiError.js";

export class ValidationError extends ApiError {
    constructor(
        errors: readonly unknown[],
        message = "Validation failed",
    ) {
        super(
            StatusCodes.UNPROCESSABLE_ENTITY,
            message,
            errors
        );
    }
}