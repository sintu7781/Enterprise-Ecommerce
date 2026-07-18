import { StatusCodes } from "http-status-codes";
import { ApiError } from "./ApiError.js";

export class ForbiddenError extends ApiError {
    constructor(
        message = "You do not have permission to perform this action."
    ) {
        super(
            StatusCodes.FORBIDDEN,
            message
        );
    }
}