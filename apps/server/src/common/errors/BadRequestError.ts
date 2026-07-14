import { StatusCodes } from "http-status-codes";
import { ApiError } from "./ApiError.js";

export class BadRequestError extends ApiError {
    constructor(
        message = "Bad request",
        errors?: unknown
    ) {
        super(StatusCodes.BAD_REQUEST, message, errors);
    }
}