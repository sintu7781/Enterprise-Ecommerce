import type { RequestHandler } from "express";

import { jwtService } from "../security/index.js";
import { extractBearerToken } from "../http/index.js";

export const authenticateMiddleware: RequestHandler = (
    req,
    _res,
    next,
) => {
    try {
        const token = extractBearerToken(
    req.header("authorization"),
);

        req.user =
            jwtService.verifyAccessToken(
                token,
            );

        next();
    } catch (error) {

        next(error);
    }
}