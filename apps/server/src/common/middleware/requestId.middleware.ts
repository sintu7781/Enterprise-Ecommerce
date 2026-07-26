import type { RequestHandler } from "express";
import { randomUUID } from "node:crypto";

export const requestIdMiddleware: RequestHandler = (
    req,
    res,
    next,
) => {
    const requestId = randomUUID();

    req.requestId = requestId;

    res.setHeader("X-Request-Id", requestId);

    next();
}