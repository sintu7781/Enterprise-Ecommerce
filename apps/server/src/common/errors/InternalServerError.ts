import { StatusCodes } from "http-status-codes";
import { ApiError } from "./ApiError.js";

export class InternalServerError extends ApiError {
    constructor(
        message = "Internal server error"
    ) {
        super(StatusCodes.INTERNAL_SERVER_ERROR, message);
    }
}