import type { RequestHandler } from "express";

import {
    ZodError,
    type ZodType,
} from "zod";

import {
    ValidationError,
} from "../errors/index.js";

import { VALIDATION_MESSAGES } from "../constants/validation.messages.js";

interface ValidationSchema {

    body?: ZodType;

    params?: ZodType;

    query?: ZodType;

    headers?: ZodType;

    cookies?: ZodType;

}

export const validationMiddleware = (
    schema: ValidationSchema,
): RequestHandler => {

    return async (
        req,
        _res,
        next,
    ) => {

        try {

            const {
                body,
                params,
                query,
                headers,
                cookies,
            } = schema;

            if (body) {

                const result =
                    await body.safeParseAsync(
                        req.body,
                    );

                if (!result.success) {

                    return next(
                        new ValidationError(
                            result.error.issues,
                            VALIDATION_MESSAGES.FAILED,
                        ),
                    );
                }

                req.body = result.data;
            }

            if (params) {

                const result =
                    await params.safeParseAsync(
                        req.params,
                    );

                if (!result.success) {

                    return next(
                        new ValidationError(
                            result.error.issues,
                            VALIDATION_MESSAGES.FAILED,
                        ),
                    );
                }

                Object.assign(
                    req.params,
                    result.data,
                );
            }

            if (query) {

                const result =
                    await query.safeParseAsync(
                        req.query,
                    );

                if (!result.success) {

                    return next(
                        new ValidationError(
                            result.error.issues,
                            VALIDATION_MESSAGES.FAILED,
                        ),
                    );
                }

                Object.assign(
                    req.query,
                    result.data,
                );
            }

            if (headers) {

                const result =
                    await headers.safeParseAsync(
                        req.headers,
                    );

                if (!result.success) {

                    return next(
                        new ValidationError(
                            result.error.issues,
                            VALIDATION_MESSAGES.FAILED,
                        ),
                    );
                }
            }

            if (cookies) {
                const result =
                    await cookies.safeParseAsync(
                        req.cookies
                    );

                if (!result.success) {
                    return next(
                        new ValidationError(
                            result.error.issues,
                            VALIDATION_MESSAGES.FAILED,
                        ),
                    );
                }

                req.cookies = result.data;
            }

            next();

        } catch (error) {

            if (error instanceof ZodError) {
                return next(
                    new ValidationError(
                        error.issues,
                        VALIDATION_MESSAGES.FAILED,
                    ),
                );
            }

            next(error);
        }
    };
};