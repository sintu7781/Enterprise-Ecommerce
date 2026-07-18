import { StatusCodes } from "http-status-codes";
import { ApiError } from "./ApiError.js";

export class NotFoundError extends ApiError {
    constructor(
        resource = "Resource"
    ) {
        super(StatusCodes.NOT_FOUND, `${resource} not found`);
    }
}