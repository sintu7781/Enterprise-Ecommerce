import { StatusCodes } from "http-status-codes";
import { ApiError } from "./ApiError.js";

export class ConflictError extends ApiError {
    constructor(
        message = "Conflict"
    ) {
        super(StatusCodes.CONFLICT, message);
    }
}