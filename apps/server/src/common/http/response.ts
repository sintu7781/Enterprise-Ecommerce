import type { Response } from "express";

import { StatusCodes } from "http-status-codes";

import { ApiResponse } from "./api-response.js";

class ResponseBuilder {

    public readonly success = <T>(
        res: Response,
        data?: T,
        message = "Success",
        statusCode = StatusCodes.OK,
        meta?: unknown,
    ): Response => {

        return res.status(statusCode).json(
            new ApiResponse({
                statusCode,
                message,
                data,
                meta,
            }),
        );
    };

    public readonly created = <T>(
        res: Response,
        data: T,
        message = "Created successfully.",
        meta?: unknown,
    ): Response => {

        return this.success(
            res,
            data,
            message,
            StatusCodes.CREATED,
            meta,
        );
    };

    public readonly accepted = <T>(
        res: Response,
        data: T,
        message = "Accepted.",
        meta?: unknown,
    ): Response => {

        return this.success(
            res,
            data,
            message,
            StatusCodes.ACCEPTED,
            meta,
        );

    };

    public readonly noContent = (
        res: Response,
    ): Response => {

        return res
            .status(StatusCodes.NO_CONTENT)
            .send();
    };
}

export const response = Object.freeze(
    new ResponseBuilder(),
);