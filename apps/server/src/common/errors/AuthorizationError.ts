import { StatusCodes } from "http-status-codes";
import { ApiError } from "./ApiError.js";

export class AuthorizationError extends ApiError {
    constructor(
        message = "Access denied"
    ) {
        super(StatusCodes.FORBIDDEN, message);
    }
}