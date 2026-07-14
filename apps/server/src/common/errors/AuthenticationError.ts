import { StatusCodes } from "http-status-codes";
import { ApiError } from "./ApiError.js";

export class AuthenticationError extends ApiError {
    constructor(
        message = "Authentication required"
    ) {
        super(StatusCodes.UNAUTHORIZED, message);
    }
}