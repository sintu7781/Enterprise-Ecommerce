import type { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { env } from "../config/env.js";
import { ApiError } from "../errors/ApiError.js";

export const errorMiddleware: ErrorRequestHandler = (
    error: unknown,
    req: Request,
    res: Response,
    _next: NextFunction,
) => {
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = "Internal Server Error";
    let errors: unknown = null;

    if (error instanceof ApiError) {
        statusCode = error.statusCode;
        message = error.message;
        errors = error.errors;
    } else if (error instanceof Error) {
        message = error.message;
    }

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors,
        requestId: req.requestId,
        stack: env.NODE_ENV === "development" ?
            error instanceof Error ?
                error.stack : null : undefined,
        timeStamp: new Date().toISOString(),
    });
};