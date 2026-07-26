import type {
    NextFunction,
    Request,
    Response,
} from "express";

import {
    ForbiddenError,
    AuthenticationError,
} from "../../common/errors/index.js";

import { services } from "../../container.js";

export const requirePermission = (
    permission: string,
) => {

    return async (
        req: Request,
        _res: Response,
        next: NextFunction,

    ) => {
        try {
            const user = req.user;

            if (!user) {
                return next(
                    new AuthenticationError(),
                );
            }
        
            const allowed =
                await services.rbac.hasPermission({
                    userId: user.id,
                    permissionCode: permission,
                });
            
            if (!allowed) {
                return next(
                    new ForbiddenError(),
                );
            }

            next();
        } catch (error) {
            next(error);
        }
    };

};