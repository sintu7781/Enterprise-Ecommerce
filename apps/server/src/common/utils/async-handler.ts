import type {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from "express";

import type { ParsedQs } from "qs";

export const asyncHandler = <
    P extends Record<string, string> = Record<string, string>,
    ResBody = unknown,
    ReqBody = unknown,
    ReqQuery = ParsedQs,
    Locals extends Record<string, unknown> = Record<string, unknown>,
>(
    handler: (
        req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
        res: Response<ResBody, Locals>,
        next: NextFunction,
    ) => Promise<unknown>,
): RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> => {
    return (
        req,
        res,
        next,
    ) => {
        Promise.resolve(
            handler(req, res, next),
        ).catch(next);
    };
};